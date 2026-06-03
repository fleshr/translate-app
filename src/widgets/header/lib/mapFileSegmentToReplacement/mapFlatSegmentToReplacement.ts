import type { TranslationFlatSegment } from "@/entities/translation";
import type { Replacement } from "@/shared/model/parser";

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
