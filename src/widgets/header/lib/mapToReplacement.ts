import type { Replacement } from "@/entities/parser";
import type { TranslationFlatSegment } from "@/entities/translation";

export const mapToReplacement = (
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
