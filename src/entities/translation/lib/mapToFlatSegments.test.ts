import { describe, expect, it } from "vitest";
import {
  getTranslationFileOccurrenceMock,
  getTranslationSegmentMock,
} from "../mocks";
import { mapToFlatSegments } from "./mapToFlatSegments";

const testSegment = getTranslationSegmentMock({
  fileOccurrences: {
    "file-1": [
      getTranslationFileOccurrenceMock({ position: { start: 0, end: 10 } }),
    ],
    "file-2": [
      getTranslationFileOccurrenceMock({
        position: { start: 10, end: 20 },
        metadata: { test: "test" },
      }),
      getTranslationFileOccurrenceMock({ position: { start: 20, end: 30 } }),
    ],
  },
});

describe("entities/translation/lib/mapToFlatSegments", () => {
  it("should return all segments without fileId passed", () => {
    const result = mapToFlatSegments(testSegment);

    expect(result).toEqual([
      {
        originalText: "Original text",
        machineTranslation: "Machine translation",
        manualTranslation: "Manual translation",
        position: { start: 0, end: 10 },
        metadata: {},
      },
      {
        originalText: "Original text",
        machineTranslation: "Machine translation",
        manualTranslation: "Manual translation",
        position: { start: 10, end: 20 },
        metadata: { test: "test" },
      },
      {
        originalText: "Original text",
        machineTranslation: "Machine translation",
        manualTranslation: "Manual translation",
        position: { start: 20, end: 30 },
        metadata: {},
      },
    ]);
  });

  it("should return only segments with passed fileId", () => {
    const result = mapToFlatSegments(testSegment, "file-1");

    expect(result).toEqual([
      {
        originalText: "Original text",
        machineTranslation: "Machine translation",
        manualTranslation: "Manual translation",
        position: { start: 0, end: 10 },
        metadata: {},
      },
    ]);
  });
});
