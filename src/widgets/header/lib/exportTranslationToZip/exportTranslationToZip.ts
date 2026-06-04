import type { Parser } from "@/entities/parser";
import {
  isTranslationCommon,
  isTranslationFile,
  type TranslationResource,
} from "@/entities/translation";
import JSZip from "jszip";
import { concat, filter, flatMap, map, merge, omit, pipe } from "remeda";
import { mapFlatSegmentToReplacement } from "../mapFileSegmentToReplacement/mapFlatSegmentToReplacement";

export const exportTranslationToZip = (
  resources: TranslationResource[],
  parser: Parser,
): Promise<Blob> => {
  const zip = new JSZip();
  const files = resources.filter(isTranslationFile);
  const commons = resources.filter(isTranslationCommon);

  for (const file of files) {
    const { id, content, relPath, segments } = file;

    const commonSegments = pipe(
      commons,
      flatMap((common) => common.segments),
      filter((segment) => id in segment.fileOccurrences),
    );

    const flatSegments = flatMap(concat(segments, commonSegments), (segment) =>
      map(segment.fileOccurrences[id] ?? [], (fileMetadata) => {
        return merge(omit(segment, ["fileOccurrences"]), fileMetadata);
      }),
    );

    const replacements = map(flatSegments, mapFlatSegmentToReplacement);
    const array = parser.replaceText(content, replacements);

    zip.file(relPath, array);
  }

  return zip.generateAsync({ type: "blob" });
};
