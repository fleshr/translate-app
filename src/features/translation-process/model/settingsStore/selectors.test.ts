import { describe, expect, it } from "vitest";
import { getTranslationProcessSettingsStoreStateMock } from "../../mocks";
import {
  selectBatchSize,
  selectMode,
  selectSettings,
  selectSourceLanguage,
  selectTargetLanguage,
} from "./selectors";

const testStore1 = getTranslationProcessSettingsStoreStateMock();
const testStore2 = getTranslationProcessSettingsStoreStateMock({
  mode: "batch",
  batchSize: 2,
  sourceLanguage: "ru",
  targetLanguage: "ja",
});

describe("features/translation-process/model/settingsStore/selectors", () => {
  describe("selectSettings", () => {
    it("should return settings", () => {
      expect(selectSettings(testStore1)).toBe(testStore1);
      expect(selectSettings(testStore2)).toBe(testStore2);
    });
  });

  describe("selectMode", () => {
    it("should return mode", () => {
      expect(selectMode(testStore1)).toBe(testStore1.mode);
      expect(selectMode(testStore2)).toBe(testStore2.mode);
    });
  });

  describe("selectBatchSize", () => {
    it("should return batch size", () => {
      expect(selectBatchSize(testStore1)).toBe(testStore1.batchSize);
      expect(selectBatchSize(testStore2)).toBe(testStore2.batchSize);
    });
  });

  describe("selectSourceLanguage", () => {
    it("should return source language", () => {
      expect(selectSourceLanguage(testStore1)).toBe(testStore1.sourceLanguage);
      expect(selectSourceLanguage(testStore2)).toBe(testStore2.sourceLanguage);
    });
  });

  describe("selectTargetLanguage", () => {
    it("should return target language", () => {
      expect(selectTargetLanguage(testStore1)).toBe(testStore1.targetLanguage);
      expect(selectTargetLanguage(testStore2)).toBe(testStore2.targetLanguage);
    });
  });
});
