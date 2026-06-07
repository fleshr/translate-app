import { describe, expect, it } from "vitest";
import { getTranslationProcessSettingsStoreStateMock } from "../../mocks";
import { selectBatchSize, selectMode } from "./selectors";

const testStore1 = getTranslationProcessSettingsStoreStateMock();
const testStore2 = getTranslationProcessSettingsStoreStateMock({
  mode: "batch",
  batchSize: 2,
});

describe("features/translation-process/model/settingsStore/selectors", () => {
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
});
