import {
  getTranslationFileMock,
  getTranslationSegmentMock,
} from "@/entities/translation/mocks";
import { describe, expect, it } from "vitest";
import { getSearchResults } from "./getSearchResults";

const resources = [
  getTranslationFileMock({
    segments: [
      getTranslationSegmentMock({ id: "segment-1", originalText: "123" }),
      getTranslationSegmentMock({ id: "segment-2", originalText: "test" }),
    ],
  }),
];

describe("features/search/lib/getSearchResults", () => {
  it("should return empty array if search text empty", () => {
    const result = getSearchResults(resources, {
      searchText: "",
      searchField: "originalText",
      caseSensitive: true,
    });

    expect(result).toEqual([]);
  });

  it("should return empty array if search text not found", () => {
    const result = getSearchResults(resources, {
      searchText: "not found",
      searchField: "originalText",
      caseSensitive: true,
    });

    expect(result).toEqual([]);
  });

  it("should filter result segements with search text", () => {
    const result = getSearchResults(resources, {
      searchText: "test",
      searchField: "originalText",
      caseSensitive: true,
    });

    expect(result).toEqual([
      {
        label: "File 1",
        type: "header",
        resourceId: "file-1",
      },
      {
        label: "test",
        type: "select",
        resourceId: "file-1",
        segmentId: "segment-2",
      },
    ]);
  });
});
