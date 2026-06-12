import type {
  TranslationFlatSegment,
  TranslationSegment,
} from "../model/segment/types";

export const mapToFlatSegments = (
  segment: TranslationSegment,
  fileId?: string,
): TranslationFlatSegment[] => {
  const {
    id,
    resourceId,
    originalText,
    machineTranslation,
    manualTranslation,
    fileOccurrences,
  } = segment;

  const occurrences = fileId
    ? (fileOccurrences[fileId] ?? [])
    : Object.values(fileOccurrences).flat();

  return occurrences.map(({ position, metadata }) => ({
    id,
    resourceId,
    originalText,
    machineTranslation,
    manualTranslation,
    position,
    metadata,
  }));
};
