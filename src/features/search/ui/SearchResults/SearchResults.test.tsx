import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setReplaceSelected } from "../../model/searchStore/actions";
import { useSearchStore } from "../../model/searchStore/store";
import { SearchResults } from "./SearchResults";

// https://github.com/TanStack/virtual/issues/641#issuecomment-2851908893
Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
  value: 800,
});
Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
  value: 800,
});

vi.mock("../../model/searchStore/actions", { spy: true });

describe("features/search/ui/SearchResults", () => {
  beforeEach(() => {
    useSearchStore.setState({ searchText: "test" });
    useTranslationStore.setState(getTranslationStoreStateMock());
  });

  afterEach(() => {
    resetStore(useSearchStore, useTranslationStore);
  });

  it("should display empty list", () => {
    useSearchStore.setState({ searchText: "" });
    const { queryAllByTestId } = render(<SearchResults />);

    const items = queryAllByTestId(/SearchResults.SearchResult.\d+$/);
    expect(items).toHaveLength(0);
  });

  it("should display results list", () => {
    const { queryAllByTestId, getByTestId } = render(<SearchResults />);

    const items = queryAllByTestId(/SearchResults.SearchResult.\d+$/);
    expect(items).toHaveLength(5);

    const header1 = getByTestId("SearchResults.SearchResult.0");
    expect(header1).toHaveTextContent("Common 1");

    const select1 = getByTestId("SearchResults.SearchResult.1");
    expect(select1).toHaveTextContent("test1");

    const header2 = getByTestId("SearchResults.SearchResult.2");
    expect(header2).toHaveTextContent("File 1");

    const select2 = getByTestId("SearchResults.SearchResult.3");
    expect(select2).toHaveTextContent("test2");

    const select3 = getByTestId("SearchResults.SearchResult.4");
    expect(select3).toHaveTextContent("test3");
  });

  it("should select all segments when none selected", async () => {
    const { getByTestId } = render(<SearchResults />);

    const select = getByTestId("SearchResults.SelectAllCheckbox");
    await userEvent.click(select);

    expect(setReplaceSelected).toHaveBeenCalledWith([
      "segment-1",
      "segment-2",
      "segment-3",
    ]);
  });

  it("should select all segments when partially selected", async () => {
    useSearchStore.setState({ replaceSelected: ["segment-1"] });
    const { getByTestId } = render(<SearchResults />);

    const select = getByTestId("SearchResults.SelectAllCheckbox");
    await userEvent.click(select);

    expect(setReplaceSelected).toHaveBeenCalledWith([
      "segment-1",
      "segment-2",
      "segment-3",
    ]);
  });

  it("should unselect all segments when all selected", async () => {
    useSearchStore.setState({
      replaceSelected: ["segment-1", "segment-2", "segment-3"],
    });
    const { getByTestId } = render(<SearchResults />);

    const select = getByTestId("SearchResults.SelectAllCheckbox");
    await userEvent.click(select);

    const unselect = getByTestId("SearchResults.SelectAllCheckbox");
    await userEvent.click(unselect);

    expect(setReplaceSelected).toHaveBeenCalledWith([]);
  });
});
