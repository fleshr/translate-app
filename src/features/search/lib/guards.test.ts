import { describe, expect, it } from "vitest";
import { getSearchResultHeaderMock, getSearchResultSelectMock } from "../mocks";
import { isSearchResultHeader, isSearchResultSelect } from "./guards";

const testSearchResultHeader = getSearchResultHeaderMock();
const testSearchResultSelect = getSearchResultSelectMock();

describe("features/search/lib/guards", () => {
  describe("isSearchResultHeader", () => {
    it("should return true for header result", () => {
      expect(isSearchResultHeader(testSearchResultHeader)).toBe(true);
    });

    it("should return false for select result", () => {
      expect(isSearchResultHeader(testSearchResultSelect)).toBe(false);
    });
  });

  describe("isSearchResultSelect", () => {
    it("should return true for select result", () => {
      expect(isSearchResultSelect(testSearchResultSelect)).toBe(true);
    });

    it("should return false for header result", () => {
      expect(isSearchResultSelect(testSearchResultHeader)).toBe(false);
    });
  });
});
