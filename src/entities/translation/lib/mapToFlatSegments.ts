import type {
  TranslationFlatSegment,
  TranslationSegment,
} from "../model/segment/types";

export const mapToFlatSegments = (
  segment: TranslationSegment,
  fileId?: string,
): TranslationFlatSegment[] => {
  const {
    originalText,
    machineTranslation,
    manualTranslation,
    fileOccurrences,
  } = segment;

  const occurrences = fileId
    ? (fileOccurrences[fileId] ?? [])
    : Object.values(fileOccurrences).flat();

  return occurrences.map(({ position, metadata }) => ({
    originalText,
    machineTranslation,
    manualTranslation,
    position,
    metadata,
  }));
};
