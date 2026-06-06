import { describe, expect, it } from "vitest";
import { getTranslationProcessStoreStateMock } from "../../mocks";
import {
  selectIsTranslating,
  selectStatus,
  selectTranslatingResource,
} from "./selectors";

const testStore1 = getTranslationProcessStoreStateMock();
const testStore2 = getTranslationProcessStoreStateMock({
  status: "translating",
  translatingResource: "test-1",
});

describe("features/translation-process/model/processStore/selectors", () => {
  describe("selectStatus", () => {
    it("should return status", () => {
      expect(selectStatus(testStore1)).toBe(testStore1.status);
      expect(selectStatus(testStore2)).toBe(testStore2.status);
    });
  });

  describe("selectTranslatingResource", () => {
    it("should return translating resource", () => {
      expect(selectTranslatingResource(testStore1)).toBe(
        testStore1.translatingResource,
      );
      expect(selectTranslatingResource(testStore2)).toBe(
        testStore2.translatingResource,
      );
    });
  });

  describe("selectIsTranslating", () => {
    it("should return is translating", () => {
      expect(selectIsTranslating(testStore1)).toBe(false);
      expect(selectIsTranslating(testStore2)).toBe(true);
    });
  });
});
