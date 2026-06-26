import { describe, expect, it } from "vitest";
import { getSearchResultHeaderMock, getSearchResultSelectMock } from "../mocks";
import { getHeaderIndexes } from "./getHeaderIndexes";

describe("features/search/lib/getHeaderIndexes", () => {
  it("should return header indexes", () => {
    const result = getHeaderIndexes([
      getSearchResultHeaderMock(),
      getSearchResultSelectMock(),
      getSearchResultSelectMock(),
      getSearchResultHeaderMock(),
      getSearchResultSelectMock(),
    ]);

    expect(result).toEqual([0, 3]);
  });
});
