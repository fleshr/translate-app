import {
  getTranslationFileMock,
  getTranslationSegmentMock,
} from "@/entities/translation/mocks";
import { describe, expect, it } from "vitest";
import { getSearchResults } from "./getSearchResults";

const resources = [
  getTranslationFileMock({
    segments: [
      getTranslationSegmentMock(),
      getTranslationSegmentMock({ originalText: "Aboba" }),
    ],
  }),
];

describe("widgets/header/lib/getSearchResults", () => {
  it("should return empty array on empty search text", () => {
    const result = getSearchResults(resources, {
      text: "",
      field: "originalText",
      caseSensitive: true,
    });

    expect(result).toEqual([]);
  });

  it("should filter result segements with search text", () => {
    const result = getSearchResults(resources, {
      text: "Aboba",
      field: "originalText",
      caseSensitive: true,
    });

    expect(result).toEqual([
      { ...resources[0], segments: [resources[0]!.segments[1]] },
    ]);
  });
});
