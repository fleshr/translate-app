import type { Replacement } from "@/shared/model/parser";
import type { TranslationFlatSegment } from "@/shared/model/translation";

export const mapFlatSegmentToReplacement = (
  segment: TranslationFlatSegment,
): Replacement => {
  return {
    original: segment.originalText,
    translation:
      segment.machineTranslation ||
      segment.manualTranslation ||
      segment.originalText,
    position: segment.position,
    metadata: segment.metadata,
  };
};
