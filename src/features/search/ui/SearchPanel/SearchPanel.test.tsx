import { render } from "@/shared/lib/testing";
import { describe, expect, it } from "vitest";
import { SearchPanel } from "./SearchPanel";

describe("features/search/ui/SearchPanel", () => {
  it("should display form and results", () => {
    const { getByTestId } = render(<SearchPanel />);

    const form = getByTestId("SearchPanel.SearchForm");
    const results = getByTestId("SearchPanel.SearchResults");

    expect(form).toBeInTheDocument();
    expect(results).toBeInTheDocument();
  });
});
