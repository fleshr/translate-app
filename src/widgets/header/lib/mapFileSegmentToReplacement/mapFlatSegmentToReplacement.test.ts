import { getTranslationFlatSegmentMock } from "@/shared/mocks/translation";
import { describe, expect, it } from "vitest";
import { mapFlatSegmentToReplacement } from "./mapFlatSegmentToReplacement";

describe("widgets/header/lib/mapFlatSegmentToReplacement", () => {
  it("should map with machineTranslation", () => {
    const segment = getTranslationFlatSegmentMock();
    const result = mapFlatSegmentToReplacement(segment);

    expect(result).toEqual({
      original: segment.originalText,
      translation: segment.machineTranslation,
      position: segment.position,
      metadata: segment.metadata,
    });
  });

  it("should map with manualTranslation", () => {
    const segment = getTranslationFlatSegmentMock({ machineTranslation: "" });
    const result = mapFlatSegmentToReplacement(segment);

    expect(result).toEqual({
      original: segment.originalText,
      translation: segment.manualTranslation,
      position: segment.position,
      metadata: segment.metadata,
    });
  });

  it("should map with originalText", () => {
    const segment = getTranslationFlatSegmentMock({
      machineTranslation: "",
      manualTranslation: "",
    });
    const result = mapFlatSegmentToReplacement(segment);

    expect(result).toEqual({
      original: segment.originalText,
      translation: segment.originalText,
      position: segment.position,
      metadata: segment.metadata,
    });
  });
});
