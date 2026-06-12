import { getTranslationFlatSegmentMock } from "@/entities/translation/mocks";
import { describe, expect, it } from "vitest";
import { mapToReplacement } from "./mapToReplacement";

describe("widgets/header/lib/mapToReplacement", () => {
  it("should map with machineTranslation", () => {
    const segment = getTranslationFlatSegmentMock();
    const result = mapToReplacement(segment);

    expect(result).toEqual({
      original: segment.originalText,
      translation: segment.machineTranslation,
      position: segment.position,
      metadata: segment.metadata,
    });
  });

  it("should map with manualTranslation", () => {
    const segment = getTranslationFlatSegmentMock({ machineTranslation: "" });
    const result = mapToReplacement(segment);

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
    const result = mapToReplacement(segment);

    expect(result).toEqual({
      original: segment.originalText,
      translation: segment.originalText,
      position: segment.position,
      metadata: segment.metadata,
    });
  });
});
