import type { TranslationBaseSegment } from "../model/translation/types";

export const isSegmentTranslated = (
  segment: TranslationBaseSegment,
): boolean => {
  return Boolean(segment.machineTranslation || segment.manualTranslation);
};

export const isSegmentUntranslated = (
  segment: TranslationBaseSegment,
): boolean => {
  return !isSegmentTranslated(segment);
};
