import { getTranslationBaseResourceMock } from "@/entities/translation/mocks";
import { render } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TranslationResourceButton } from "./TranslationResourceButton";

const testSegement = getTranslationBaseResourceMock();

describe("widgets/translation-resources/ui/TranslationResourceButton", () => {
  it("should call onSelect on click", async () => {
    const onSelect = vi.fn();
    const { getByTestId } = render(
      <TranslationResourceButton resource={testSegement} onSelect={onSelect} />,
    );

    const button = getByTestId("TranslationResourceButton");
    await userEvent.click(button);

    expect(onSelect).toHaveBeenCalledWith(testSegement.id);
  });

  it("should show badge if progress provided", () => {
    const { getByTestId } = render(
      <TranslationResourceButton
        resource={testSegement}
        progress={{ done: 1, total: 2 }}
      />,
    );

    const badge = getByTestId("TranslationResourceButton.Badge");

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("50%");
  });

  it("should not show badge if not provided", () => {
    const { queryByTestId } = render(
      <TranslationResourceButton resource={testSegement} />,
    );

    const badge = queryByTestId("TranslationResourceButton.Badge");
    expect(badge).not.toBeInTheDocument();
  });

  it("should show loader if processing", () => {
    const { getByTestId } = render(
      <TranslationResourceButton resource={testSegement} isProcessing />,
    );

    const loader = getByTestId("TranslationResourceButton.Loader");
    expect(loader).toBeInTheDocument();
  });

  it("should not show loader if not processing", () => {
    const { queryByTestId } = render(
      <TranslationResourceButton resource={testSegement} />,
    );

    const loader = queryByTestId("TranslationResourceButton.Loader");
    expect(loader).not.toBeInTheDocument();
  });

  it("should apply correct variants when selected", () => {
    const { getByTestId } = render(
      <TranslationResourceButton
        resource={testSegement}
        progress={{ done: 1, total: 2 }}
        isSelected
      />,
    );

    const button = getByTestId("TranslationResourceButton");
    const badge = getByTestId("TranslationResourceButton.Badge");

    expect(button).toHaveAttribute("data-variant", "filled");
    expect(badge).toHaveAttribute("data-variant", "white");
  });

  it("should apply correct variants when not selected", () => {
    const { getByTestId } = render(
      <TranslationResourceButton
        resource={testSegement}
        progress={{ done: 1, total: 2 }}
      />,
    );

    const button = getByTestId("TranslationResourceButton");
    const badge = getByTestId("TranslationResourceButton.Badge");

    expect(button).toHaveAttribute("data-variant", "subtle");
    expect(badge).toHaveAttribute("data-variant", "filled");
  });
});
