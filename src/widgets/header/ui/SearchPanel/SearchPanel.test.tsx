import {
  replaceTranslationSegmentsField,
  useTranslationStore,
} from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import {
  setSessionSelectedResource,
  setSessionSelectedSegment,
  useSessionStore,
} from "@/shared/model/sessionStore";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchPanel } from "./SearchPanel";

vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/entities/translation", { spy: true });

describe("widgets/header/ui/SearchPanel", () => {
  beforeEach(() => {
    useTranslationStore.setState(getTranslationStoreStateMock());
  });

  afterEach(() => {
    resetStore(useTranslationStore, useSessionStore);
  });

  it("should find resources with segments", async () => {
    const { getByTestId, getAllByTestId } = render(<SearchPanel />);

    const input = getByTestId("SearchForm.SearchInput");
    await userEvent.type(input, "1");

    const button = getByTestId("SearchForm.FindButton");
    await userEvent.click(button);

    const card = getAllByTestId(/SearchPanel.ResultCard.\d+$/);
    expect(card).toHaveLength(1);

    const cardItems = getAllByTestId(/SearchPanel.ResultCard.\d+.Item.\d+/);
    expect(cardItems).toHaveLength(1);

    const cardTitle = getByTestId("SearchPanel.ResultCard.0.Title");
    expect(cardTitle).toHaveTextContent("Common 1");

    const cardItem = getByTestId("SearchPanel.ResultCard.0.Item.0");
    expect(cardItem).toHaveTextContent("test1");
  });

  it("should display checkboxes on results in replace mode", async () => {
    const { getByTestId, queryByTestId } = render(<SearchPanel />);

    const input = getByTestId("SearchForm.SearchInput");
    await userEvent.type(input, "1");

    const button = getByTestId("SearchForm.FindButton");
    await userEvent.click(button);

    let itemCheckbox = queryByTestId(
      "SearchPanel.ResultCard.0.Item.0.Checkbox",
    );
    expect(itemCheckbox).not.toBeInTheDocument();

    const replaceCheckbox = getByTestId("SearchForm.ReplaceCheckbox");
    await userEvent.click(replaceCheckbox);

    itemCheckbox = queryByTestId("SearchPanel.ResultCard.0.Item.0.Checkbox");
    expect(itemCheckbox).toBeInTheDocument();
  });

  it("should update session store on result segment click", async () => {
    const { getByTestId } = render(<SearchPanel />);

    const input = getByTestId("SearchForm.SearchInput");
    await userEvent.type(input, "1");

    const button = getByTestId("SearchForm.FindButton");
    await userEvent.click(button);

    const item = getByTestId("SearchPanel.ResultCard.0.Item.0");
    await userEvent.click(item);

    expect(setSessionSelectedSegment).toHaveBeenCalledWith("segment-1");
    expect(setSessionSelectedResource).toHaveBeenCalledWith("common-1");
  });

  it("should replace segment text on replace button click", async () => {
    const { getByTestId } = render(<SearchPanel />);

    const replaceCheckbox = getByTestId("SearchForm.ReplaceCheckbox");
    await userEvent.click(replaceCheckbox);

    const searchInput = getByTestId("SearchForm.SearchInput");
    await userEvent.type(searchInput, "1");

    const replaceInput = getByTestId("SearchForm.ReplaceInput");
    await userEvent.type(replaceInput, "9");

    const findButton = getByTestId("SearchForm.FindButton");
    await userEvent.click(findButton);

    const itemCheckbox = getByTestId(
      "SearchPanel.ResultCard.0.Item.0.Checkbox",
    );
    await userEvent.click(itemCheckbox);

    const replaceButton = getByTestId("SearchForm.ReplaceButton");
    await userEvent.click(replaceButton);

    expect(replaceTranslationSegmentsField).toHaveBeenCalledWith(
      ["segment-1"],
      "1",
      "9",
      "originalText",
    );
  });

  it("should search in different fields", async () => {
    const { getByTestId, getByRole, getAllByTestId } = render(<SearchPanel />);

    const input = getByTestId("SearchForm.SearchInput");
    await userEvent.type(input, "Manual");

    const select = getByTestId("SearchForm.FieldSelect");
    await userEvent.click(select);

    const item = getByRole("option", { name: "Manual Translation" });
    await userEvent.click(item);

    const button = getByTestId("SearchForm.FindButton");
    await userEvent.click(button);

    const results = getAllByTestId(/SearchPanel.ResultCard.\d+.Item.\d+/);
    expect(results).toHaveLength(2);
  });
});
