import { createMockFactory } from "@/shared/lib/testing";
import type {
  TranslationBaseSegment,
  TranslationFileOccurrence,
  TranslationFlatSegment,
  TranslationSegment,
} from "../model/segment/types";

const mockTranslationBaseSegment: TranslationBaseSegment = {
  id: "segment-1",
  resourceId: "file-1",
  originalText: "Original text",
  machineTranslation: "Machine translation",
  manualTranslation: "Manual translation",
};

export const getTranslationBaseSegmentMock = createMockFactory(
  mockTranslationBaseSegment,
);

const mockTranslationFileOccurrence: TranslationFileOccurrence = {
  position: { start: 0, end: 10 },
  metadata: {},
};

export const getTranslationFileOccurrenceMock = createMockFactory(
  mockTranslationFileOccurrence,
);

const mockTranslationSegment: TranslationSegment = {
  ...mockTranslationBaseSegment,
  fileOccurrences: {},
};

export const getTranslationSegmentMock = createMockFactory(
  mockTranslationSegment,
);

const mockTranslationFlatSegment: TranslationFlatSegment = {
  ...mockTranslationBaseSegment,
  ...mockTranslationFileOccurrence,
};

export const getTranslationFlatSegmentMock = createMockFactory(
  mockTranslationFlatSegment,
);
