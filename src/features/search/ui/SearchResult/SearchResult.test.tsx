import { render } from "@/shared/lib/testing";
import { describe, expect, it } from "vitest";
import {
  getSearchResultHeaderMock,
  getSearchResultSelectMock,
} from "../../mocks";
import { SearchResult } from "./SearchResult";

describe("features/search/ui/SearchResult", () => {
  it("should render header", () => {
    const { getByTestId } = render(
      <SearchResult result={getSearchResultHeaderMock()} />,
    );

    const header = getByTestId("ResultHeader");
    expect(header).toBeInTheDocument();
  });

  it("should render select", () => {
    const { getByTestId } = render(
      <SearchResult result={getSearchResultSelectMock()} />,
    );

    const select = getByTestId("ResultSelect");
    expect(select).toBeInTheDocument();
  });
});
