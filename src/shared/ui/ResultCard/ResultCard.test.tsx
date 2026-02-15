import { render } from "@/shared/lib/testing/render";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ResultCard } from "./ResultCard";

const testItems = [
  { value: "1", label: "Aboba" },
  { value: "2", label: "Test" },
];

describe("shared/ui/ResultCard", () => {
  it("should render items", () => {
    const { getByTestId } = render(
      <ResultCard title="Test" items={testItems} highlight="Test" />,
    );

    expect(getByTestId("ResultCard.Item.0")).toBeInTheDocument();
    expect(getByTestId("ResultCard.Item.1")).toBeInTheDocument();
  });

  it("should render without checkboxes by default", () => {
    const { queryByTestId } = render(
      <ResultCard title="Test" items={testItems} highlight="Test" />,
    );

    expect(queryByTestId("ResultCard.Title.Checkbox")).not.toBeInTheDocument();
    expect(queryByTestId("ResultCard.Item.0.Checkbox")).not.toBeInTheDocument();
    expect(queryByTestId("ResultCard.Item.1.Checkbox")).not.toBeInTheDocument();
  });

  it("should render checkboxes if selectable", () => {
    const { getByTestId } = render(
      <ResultCard title="Test" items={testItems} highlight="Test" selectable />,
    );

    expect(getByTestId("ResultCard.Title.Checkbox")).toBeInTheDocument();
    expect(getByTestId("ResultCard.Item.0.Checkbox")).toBeInTheDocument();
    expect(getByTestId("ResultCard.Item.1.Checkbox")).toBeInTheDocument();
  });

  it("should call handles", async () => {
    const onSelect = vi.fn();
    const onClick = vi.fn();

    const { getByTestId } = render(
      <ResultCard
        title="Test"
        items={testItems}
        highlight="Test"
        onSelect={onSelect}
        onClick={onClick}
        selectable
      />,
    );

    await userEvent.click(getByTestId("ResultCard.Title.Checkbox"));
    expect(onSelect).toHaveBeenCalled();

    await userEvent.click(getByTestId("ResultCard.Item.1.Checkbox"));
    expect(onSelect).toHaveBeenCalled();

    await userEvent.click(getByTestId("ResultCard.Item.1"));
    expect(onClick).toHaveBeenCalled();
  });

  it("should correctly select", async () => {
    const onSelect = vi.fn();

    const { getByTestId } = render(
      <ResultCard
        title="Test"
        items={testItems}
        highlight="Test"
        onSelect={onSelect}
        selectable
      />,
    );

    await userEvent.click(getByTestId("ResultCard.Item.0.Checkbox"));
    expect(onSelect).toHaveBeenNthCalledWith(1, ["1"]);

    await userEvent.click(getByTestId("ResultCard.Title.Checkbox"));
    expect(onSelect).toHaveBeenNthCalledWith(2, ["1", "2"]);
  });

  it("should correctly deselect", async () => {
    const onSelect = vi.fn();

    const { getByTestId } = render(
      <ResultCard
        title="Test"
        items={testItems}
        highlight="Test"
        selected={["1", "2"]}
        onSelect={onSelect}
        selectable
      />,
    );

    await userEvent.click(getByTestId("ResultCard.Item.0.Checkbox"));
    expect(onSelect).toHaveBeenNthCalledWith(1, ["2"]);

    await userEvent.click(getByTestId("ResultCard.Title.Checkbox"));
    expect(onSelect).toHaveBeenNthCalledWith(2, []);
  });

  it("should correctly render partially selected items", () => {
    const { getByTestId } = render(
      <ResultCard
        title="Test"
        items={testItems}
        highlight="Test"
        selected={["1"]}
        selectable
      />,
    );

    expect(getByTestId("ResultCard.Title.Checkbox")).toHaveAttribute(
      "data-indeterminate",
    );
    expect(getByTestId("ResultCard.Title.Checkbox")).not.toBeChecked();
    expect(getByTestId("ResultCard.Item.0.Checkbox")).toBeChecked();
    expect(getByTestId("ResultCard.Item.1.Checkbox")).not.toBeChecked();
  });

  it("should correctly render fully selected items", () => {
    const { getByTestId } = render(
      <ResultCard
        title="Test"
        items={testItems}
        highlight="Test"
        selected={["1", "2"]}
        selectable
      />,
    );

    expect(getByTestId("ResultCard.Title.Checkbox")).not.toHaveAttribute(
      "data-indeterminate",
    );
    expect(getByTestId("ResultCard.Title.Checkbox")).toBeChecked();
    expect(getByTestId("ResultCard.Item.0.Checkbox")).toBeChecked();
    expect(getByTestId("ResultCard.Item.1.Checkbox")).toBeChecked();
  });

  it("should correctly render no selected items", () => {
    const { getByTestId } = render(
      <ResultCard title="Test" items={testItems} highlight="Test" selectable />,
    );

    expect(getByTestId("ResultCard.Title.Checkbox")).not.toHaveAttribute(
      "data-indeterminate",
    );
    expect(getByTestId("ResultCard.Title.Checkbox")).not.toBeChecked();
    expect(getByTestId("ResultCard.Item.0.Checkbox")).not.toBeChecked();
    expect(getByTestId("ResultCard.Item.1.Checkbox")).not.toBeChecked();
  });

  it("should handle items collapse", async () => {
    const { getByTestId } = render(
      <ResultCard title="Test" items={testItems} highlight="Test" />,
    );

    expect(getByTestId("ResultCard.Collapse")).toBeVisible();
    await userEvent.click(getByTestId("ResultCard.Title"));
    expect(getByTestId("ResultCard.Collapse")).not.toBeVisible();
  });
});
