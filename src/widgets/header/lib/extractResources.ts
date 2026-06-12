import type { Parser } from "@/entities/parser";
import type {
  TranslationBaseCommon,
  TranslationCommon,
  TranslationFile,
  TranslationResource,
  TranslationSegment,
} from "@/entities/translation";
import { nanoid } from "nanoid";

export const extractResources = async (
  files: File[],
  parser: Parser,
): Promise<TranslationResource[]> => {
  const translationFiles: TranslationFile[] = [];
  const commons: Record<
    string,
    {
      resource: TranslationBaseCommon;
      segments: Record<string, TranslationSegment>;
    }
  > = {};

  for (const file of files) {
    if (!parser.checkFile(file)) {
      continue;
    }

    const buffer = await file.arrayBuffer();
    const segments = parser.extractText(buffer);

    if (!segments.length) {
      continue;
    }

    const fileId = nanoid();
    const fileSegments: Record<string, TranslationSegment> = {};

    for (const segment of segments) {
      if (segment.type === "file") {
        const { text, metadata, position } = segment;

        fileSegments[text] ??= {
          id: nanoid(),
          resourceId: fileId,
          originalText: text,
          machineTranslation: "",
          manualTranslation: "",
          fileOccurrences: {},
        };

        fileSegments[text].fileOccurrences[fileId] ??= [];
        fileSegments[text].fileOccurrences[fileId].push({
          position,
          metadata: metadata ?? {},
        });
      } else {
        const { key, text, metadata, position, path } = segment;

        commons[key] ??= {
          resource: {
            id: nanoid(),
            type: "common",
            name: `Common: ${key}`,
            relPath: path ?? "*",
          },
          segments: {},
        };

        commons[key].segments[text] ??= {
          id: nanoid(),
          resourceId: commons[key].resource.id,
          originalText: text,
          machineTranslation: "",
          manualTranslation: "",
          fileOccurrences: {},
        };

        commons[key].segments[text].fileOccurrences[fileId] ??= [];
        commons[key].segments[text].fileOccurrences[fileId].push({
          position,
          metadata: metadata ?? {},
        });
      }
    }

    translationFiles.push({
      id: fileId,
      type: "file",
      name: file.name,
      relPath: file.webkitRelativePath,
      segments: Object.values(fileSegments),
    });
  }

  const translationCommons: TranslationCommon[] = Object.values(commons).map(
    ({ resource, segments }) => {
      return { ...resource, segments: Object.values(segments) };
    },
  );

  return [...translationCommons, ...translationFiles];
};
