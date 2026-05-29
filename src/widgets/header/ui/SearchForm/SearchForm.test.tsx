import { render } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchForm } from "./SearchForm";

describe("widgets/header/ui/SearchForm", () => {
  it("should render replace input and button in replace mode", async () => {
    const { getByTestId, queryByTestId } = render(<SearchForm />);

    let input = queryByTestId("SearchForm.ReplaceInput");
    expect(input).not.toBeInTheDocument();

    let button = queryByTestId("SearchForm.ReplaceButton");
    expect(button).not.toBeInTheDocument();

    const checkbox = getByTestId("SearchForm.ReplaceCheckbox");
    await userEvent.click(checkbox);

    input = queryByTestId("SearchForm.ReplaceInput");
    expect(input).toBeInTheDocument();

    button = queryByTestId("SearchForm.ReplaceButton");
    expect(button).toBeInTheDocument();
  });

  it("should call onFormChange on form change", async () => {
    const onFormChange = vi.fn();
    const { getByTestId } = render(<SearchForm onFormChange={onFormChange} />);

    const input = getByTestId("SearchForm.SearchInput");
    await userEvent.type(input, "t");

    expect(onFormChange).toHaveBeenCalledWith(
      {
        searchText: "t",
        replaceText: "",
        field: "originalText",
        replace: false,
        caseSensitive: true,
      },
      {
        searchText: "",
        replaceText: "",
        field: "originalText",
        replace: false,
        caseSensitive: true,
      },
    );
  });

  it("should not call onFindClick on find button click when form is invalid", async () => {
    const onFindClick = vi.fn();
    const { getByTestId } = render(<SearchForm onFindClick={onFindClick} />);

    const button = getByTestId("SearchForm.FindButton");
    await userEvent.click(button);

    expect(onFindClick).not.toHaveBeenCalled();
  });

  it("should call onFindClick on find button click", async () => {
    const onFindClick = vi.fn();
    const { getByTestId } = render(<SearchForm onFindClick={onFindClick} />);

    const input = getByTestId("SearchForm.SearchInput");
    await userEvent.type(input, "t");

    const button = getByTestId("SearchForm.FindButton");
    await userEvent.click(button);

    expect(onFindClick).toHaveBeenCalled();
  });

  it("should not call onReplaceClick on replace button click when form is invalid", async () => {
    const onReplaceClick = vi.fn();
    const { getByTestId } = render(
      <SearchForm onReplaceClick={onReplaceClick} />,
    );

    const checkbox = getByTestId("SearchForm.ReplaceCheckbox");
    await userEvent.click(checkbox);

    const button = getByTestId("SearchForm.ReplaceButton");
    await userEvent.click(button);

    expect(onReplaceClick).not.toHaveBeenCalled();
  });

  it("should call onReplaceClick on replace button click", async () => {
    const onReplaceClick = vi.fn();
    const { getByTestId } = render(
      <SearchForm onReplaceClick={onReplaceClick} />,
    );

    const checkbox = getByTestId("SearchForm.ReplaceCheckbox");
    await userEvent.click(checkbox);

    const input = getByTestId("SearchForm.SearchInput");
    await userEvent.type(input, "t");

    const button = getByTestId("SearchForm.ReplaceButton");
    await userEvent.click(button);

    expect(onReplaceClick).toHaveBeenCalled();
  });
});
