import { createMockFactory } from "@/shared/lib/testing";
import type {
  TranslationFileOccurrence,
  TranslationFlatSegment,
  TranslationSegment,
  TranslationSegmentFields,
} from "../model/segment/types";

const mockTranslationSegmentFields: TranslationSegmentFields = {
  originalText: "Original text",
  machineTranslation: "Machine translation",
  manualTranslation: "Manual translation",
};

const mockTranslationFileOccurrence: TranslationFileOccurrence = {
  position: { start: 0, end: 10 },
  metadata: {},
};

export const getTranslationFileOccurrenceMock = createMockFactory(
  mockTranslationFileOccurrence,
);

const mockTranslationSegment: TranslationSegment = {
  ...mockTranslationSegmentFields,
  id: "segment-1",
  fileOccurrences: {},
};

export const getTranslationSegmentMock = createMockFactory(
  mockTranslationSegment,
);

const mockTranslationFlatSegment: TranslationFlatSegment = {
  ...mockTranslationSegmentFields,
  ...mockTranslationFileOccurrence,
};

export const getTranslationFlatSegmentMock = createMockFactory(
  mockTranslationFlatSegment,
);
