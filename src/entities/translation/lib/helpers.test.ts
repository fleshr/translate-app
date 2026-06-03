import { describe, expect, it } from "vitest";
import {
  getTranslationBaseSegmentMock,
  getTranslationSegmentMock,
} from "../mocks";
import { isSegmentTranslated, isSegmentUntranslated } from "./helpers";

const untranslatedSegment = getTranslationBaseSegmentMock({
  machineTranslation: "",
  manualTranslation: "",
});

const partiallyTranslatedSegment = getTranslationSegmentMock({
  machineTranslation: "test",
  manualTranslation: "",
});

const fullyTranslatedSegment = getTranslationSegmentMock({
  machineTranslation: "test",
  manualTranslation: "test",
});

describe("features/translation/lib/helpers", () => {
  describe("isSegmentTranslated", () => {
    it("should return true if segment is translated", () => {
      const result = isSegmentTranslated(fullyTranslatedSegment);

      expect(result).toBeTruthy();
    });

    it("should return false if segment is not translated", () => {
      const result = isSegmentTranslated(untranslatedSegment);

      expect(result).toBeFalsy();
    });

    it("should return true if segment is partially translated", () => {
      const result = isSegmentTranslated(partiallyTranslatedSegment);

      expect(result).toBeTruthy();
    });
  });

  describe("isSegmentUntranslated", () => {
    it("should return false if segment is translated", () => {
      const result = isSegmentUntranslated(fullyTranslatedSegment);

      expect(result).toBeFalsy();
    });

    it("should return true if segment is not translated", () => {
      const result = isSegmentUntranslated(untranslatedSegment);

      expect(result).toBeTruthy();
    });

    it("should return false if segment is partially translated", () => {
      const result = isSegmentUntranslated(partiallyTranslatedSegment);

      expect(result).toBeFalsy();
    });
  });
});
