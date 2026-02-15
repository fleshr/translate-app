import {
  getTranslationFileMock,
  getTranslationSegmentMock,
} from "@/shared/mocks/translation";
import { describe, expect, it } from "vitest";
import { getTranslationsSearchResults } from "./getTranslationsSearchResults";

const resources = [
  getTranslationFileMock({
    segments: [
      getTranslationSegmentMock(),
      getTranslationSegmentMock({ originalText: "Aboba" }),
    ],
  }),
];

describe("widgets/header/lib/getTranslationsSearchResults", () => {
  it("should return empty array on empty search text", () => {
    const result = getTranslationsSearchResults(resources, {
      text: "",
      field: "originalText",
      caseSensitive: true,
    });

    expect(result).toEqual([]);
  });

  it("should filter result segements with search text", () => {
    const result = getTranslationsSearchResults(resources, {
      text: "Aboba",
      field: "originalText",
      caseSensitive: true,
    });

    expect(result).toEqual([
      { ...resources[0], segments: [resources[0]!.segments[1]] },
    ]);
  });
});
