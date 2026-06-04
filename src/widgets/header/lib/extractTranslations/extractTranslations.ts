import type {
  ExtractedBaseSegment,
  ExtractedCommonSegment,
  Parser,
} from "@/entities/parser";
import type {
  TranslationCommon,
  TranslationFile,
  TranslationFileOccurrence,
  TranslationResource,
} from "@/entities/translation";
import { readFile } from "@/shared/lib/file";
import type { Id } from "@/shared/model/common";
import { nanoid } from "nanoid";
import { filter, groupByProp, map, mapValues, pipe, values } from "remeda";

interface CommonSegment extends ExtractedCommonSegment {
  commonId: Id;
  fileId: Id;
}

interface FileSegment extends ExtractedBaseSegment {
  fileId: Id;
}

const getFileOccurrences = (
  segments: (FileSegment | CommonSegment)[],
): Record<Id, TranslationFileOccurrence[]> => {
  return mapValues(groupByProp(segments, "fileId"), (segments) => {
    return map(segments, (segment) => ({
      position: segment.position,
      metadata: segment.metadata ?? {},
    }));
  });
};

export const extractTranslations = async (
  files: File[],
  parser: Parser,
): Promise<TranslationResource[]> => {
  const translationFiles: TranslationFile[] = [];
  const translationCommons: Record<string, TranslationCommon> = {};

  const fileSegments: FileSegment[] = [];
  const commonSegments: CommonSegment[] = [];

  const sortedFiles = [...files].sort((a, b) => a.name.localeCompare(b.name));

  for (const file of sortedFiles) {
    if (!parser.checkFile(file)) {
      continue;
    }

    const array = await readFile(file, "array");
    const { content, segments } = parser.extractText(array);

    if (!segments.length) {
      continue;
    }

    const fileId = nanoid();
    translationFiles.push({
      id: fileId,
      type: "file",
      name: file.name,
      relPath: file.webkitRelativePath,
      content,
      segments: [],
    });

    for (const segment of segments) {
      if (segment.type === "common") {
        const commonId = translationCommons[segment.key]?.id ?? nanoid();
        translationCommons[segment.key] ??= {
          id: commonId,
          type: "common",
          name: `Common: ${segment.key}`,
          relPath: segment.path ?? "*",
          segments: [],
        };

        commonSegments.push({ ...segment, commonId, fileId });
      } else {
        fileSegments.push({ ...segment, fileId });
      }
    }
  }

  const resultCommonSegments = pipe(
    translationCommons,
    values(),
    map((common) => {
      const segments = pipe(
        commonSegments,
        filter((segment) => segment.commonId === common.id),
        groupByProp("text"),
        mapValues((segments, text) => ({
          id: nanoid(),
          resourceId: common.id,
          originalText: text,
          machineTranslation: "",
          manualTranslation: "",
          fileOccurrences: getFileOccurrences(segments),
        })),
        values(),
      );

      return { ...common, segments };
    }),
  );

  const resultFileSegments = pipe(
    translationFiles,
    map((file) => {
      const segments = pipe(
        fileSegments,
        filter((segment) => segment.fileId === file.id),
        groupByProp("text"),
        mapValues((segments, text) => ({
          id: nanoid(),
          resourceId: file.id,
          originalText: text,
          machineTranslation: "",
          manualTranslation: "",
          fileOccurrences: getFileOccurrences(segments),
        })),
        values(),
      );

      return { ...file, segments };
    }),
  );

  return [...resultCommonSegments, ...resultFileSegments];
};
