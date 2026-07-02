import type { Parser } from "@/entities/parser";
import {
  isTranslationCommon,
  isTranslationFile,
  mapToFlatSegments,
  type TranslationResource,
} from "@/entities/translation";
import JSZip from "jszip";
import { concat, filter, flatMap, map, pipe } from "remeda";
import { mapToReplacement } from "./mapToReplacement";

export const exportResourcesToZip = async (
  resources: TranslationResource[],
  files: Record<string, Uint8Array<ArrayBuffer>>,
  parser: Parser,
): Promise<Blob> => {
  const zip = new JSZip();
  const resourceFiles = resources.filter(isTranslationFile);
  const resourceCommons = resources.filter(isTranslationCommon);

  for (const file of resourceFiles) {
    const { id, relPath, segments } = file;

    if (!files[relPath]) {
      throw new Error("Resource file not found");
    }

    const commonSegments = pipe(
      resourceCommons,
      flatMap((common) => common.segments),
      filter((segment) => id in segment.fileOccurrences),
    );

    const flatSegments = pipe(
      concat(segments, commonSegments),
      flatMap((segment) => mapToFlatSegments(segment, id)),
    );

    const replacements = map(flatSegments, mapToReplacement);
    const array = parser.replaceText(files[relPath], replacements);

    zip.file(relPath, array);
  }

  return zip.generateAsync({ type: "blob" });
};
