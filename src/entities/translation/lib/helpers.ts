import type { TranslationSegmentFields } from "../model/segment/types";

export const isSegmentTranslated = (
  segment: TranslationSegmentFields,
): boolean => {
  return Boolean(segment.machineTranslation || segment.manualTranslation);
};

export const isSegmentUntranslated = (
  segment: TranslationSegmentFields,
): boolean => {
  return !isSegmentTranslated(segment);
};
