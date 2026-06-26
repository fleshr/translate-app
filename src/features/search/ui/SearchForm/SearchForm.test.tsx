import { replaceTranslationSegmentsField } from "@/entities/translation";
import { render, resetStore } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getSearchStoreStateMock } from "../../mocks";
import {
  setFormValues,
  setReplaceSelected,
} from "../../model/searchStore/actions";
import { useSearchStore } from "../../model/searchStore/store";
import { SearchForm } from "./SearchForm";

const testSearchStore = getSearchStoreStateMock();

vi.mock("../../model/searchStore/actions", { spy: true });
vi.mock("@/entities/translation", { spy: true });

describe("features/search/ui/SearchForm", () => {
  afterEach(() => {
    resetStore(useSearchStore);
  });

  it("should render with initial values", () => {
    useSearchStore.setState(testSearchStore);
    const { getByTestId } = render(<SearchForm />);

    const search = getByTestId("SearchForm.SearchInput");
    const replace = getByTestId("SearchForm.ReplaceInput");

    expect(search).toHaveValue("test");
    expect(replace).toHaveValue("123");
  });

  it("should change replace text on change", async () => {
    const { getByTestId } = render(<SearchForm />);

    const replace = getByTestId("SearchForm.ReplaceInput");
    await userEvent.type(replace, "1234");

    expect(setFormValues).toHaveBeenCalledWith({ replaceText: "1234" });
  });

  it("should set form values and reset selected on find click", async () => {
    useSearchStore.setState(testSearchStore);
    const { getByTestId } = render(<SearchForm />);

    const find = getByTestId("SearchForm.FindButton");
    await userEvent.click(find);

    expect(setFormValues).toHaveBeenCalledWith({
      searchText: testSearchStore.searchText,
      searchField: testSearchStore.searchField,
      caseSensitive: testSearchStore.caseSensitive,
      replaceText: testSearchStore.replaceText,
    });
    expect(setReplaceSelected).toHaveBeenCalledWith([]);
  });

  it("should reset selected and replace segements text on replace click", async () => {
    useSearchStore.setState(testSearchStore);
    const { getByTestId } = render(<SearchForm />);

    const replace = getByTestId("SearchForm.ReplaceButton");
    await userEvent.click(replace);

    expect(setReplaceSelected).toHaveBeenCalledWith([]);
    expect(replaceTranslationSegmentsField).toHaveBeenCalledWith(
      testSearchStore.replaceSelected,
      testSearchStore.searchText,
      testSearchStore.replaceText,
      testSearchStore.searchField,
    );
  });
});
