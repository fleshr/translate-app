import { createMockFactory } from "../lib/testing";
import type {
  TranslationBaseResource,
  TranslationBaseSegment,
  TranslationCommon,
  TranslationFile,
  TranslationFileOccurrence,
  TranslationFlatSegment,
  TranslationSegment,
} from "../model/translation";

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

const mockTranslationBaseResource: TranslationBaseResource = {
  id: "base-1",
  name: "Base 1",
  relPath: "bases/base-1",
};

export const getTranslationBaseResourceMock = createMockFactory(
  mockTranslationBaseResource,
);

const mockTranslationFile: TranslationFile = {
  id: "file-1",
  type: "file",
  name: "File 1",
  content: "content",
  relPath: "files/file-1",
  segments: [],
};

export const getTranslationFileMock = createMockFactory(mockTranslationFile);

const mockTranslationCommon: TranslationCommon = {
  id: "common-1",
  type: "common",
  name: "Common 1",
  relPath: "*",
  segments: [],
};

export const getTranslationCommonMock = createMockFactory(
  mockTranslationCommon,
);
