import { render } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProgressButton } from "./ProgressButton";

describe("shared/ui/ProgressButton", () => {
  it("should call onClick", async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <ProgressButton label="Test" onClick={onClick} />,
    );

    const button = getByTestId("ProgressButton");
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should show badge if progress provided", () => {
    const { getByTestId } = render(
      <ProgressButton label="Test" progress={{ done: 1, total: 2 }} />,
    );

    const badge = getByTestId("ProgressButton.Badge");

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("50%");
  });

  it("should not show badge if not provided", () => {
    const { queryByTestId } = render(<ProgressButton label="Test" />);

    const badge = queryByTestId("ProgressButton.Badge");

    expect(badge).not.toBeInTheDocument();
  });

  it("should show loader if processing", () => {
    const { getByTestId } = render(
      <ProgressButton label="Test" isProcessing />,
    );

    const loader = getByTestId("ProgressButton.Loader");

    expect(loader).toBeInTheDocument();
  });

  it("should not show loader if not processing", () => {
    const { queryByTestId } = render(<ProgressButton label="Test" />);

    const loader = queryByTestId("ProgressButton.Loader");

    expect(loader).not.toBeInTheDocument();
  });

  it("should apply correct variants when selected", () => {
    const { getByTestId } = render(
      <ProgressButton
        label="Test"
        progress={{ done: 1, total: 2 }}
        isSelected
      />,
    );

    const button = getByTestId("ProgressButton");
    const badge = getByTestId("ProgressButton.Badge");

    expect(button).toHaveAttribute("data-variant", "filled");
    expect(badge).toHaveAttribute("data-variant", "white");
  });

  it("should apply correct variants when not selected", () => {
    const { getByTestId } = render(
      <ProgressButton label="Test" progress={{ done: 1, total: 2 }} />,
    );

    const button = getByTestId("ProgressButton");
    const badge = getByTestId("ProgressButton.Badge");

    expect(button).toHaveAttribute("data-variant", "subtle");
    expect(badge).toHaveAttribute("data-variant", "filled");
  });
});
