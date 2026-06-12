import { createMockFactory } from "@/shared/lib/testing";
import type {
  TranslationBaseCommon,
  TranslationBaseFile,
  TranslationCommon,
  TranslationFile,
} from "../model/resource/types";

const mockTranslationBaseFile: TranslationBaseFile = {
  id: "file-1",
  type: "file",
  name: "File 1",
  relPath: "files/file-1",
};

export const getTranslationBaseFileMock = createMockFactory(
  mockTranslationBaseFile,
);

const mockTranslationBaseCommon: TranslationBaseCommon = {
  id: "common-1",
  type: "common",
  name: "Common 1",
  relPath: "*",
};

export const getTranslationBaseCommonMock = createMockFactory(
  mockTranslationBaseCommon,
);

const mockTranslationFile: TranslationFile = {
  ...mockTranslationBaseFile,
  segments: [],
};

export const getTranslationFileMock = createMockFactory(mockTranslationFile);

const mockTranslationCommon: TranslationCommon = {
  ...mockTranslationBaseCommon,
  segments: [],
};

export const getTranslationCommonMock = createMockFactory(
  mockTranslationCommon,
);
