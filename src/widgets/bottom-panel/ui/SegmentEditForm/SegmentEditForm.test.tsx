import { render } from "@/shared/lib/testing";
import { getTranslationSegmentMock } from "@/shared/mocks/translation";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentEditForm } from "./SegmentEditForm";

const testSegment = getTranslationSegmentMock();

describe("widgets/bottom-panel/ui/SegmentEditForm", () => {
  it("originalText should be readonly", () => {
    const { getByTestId } = render(<SegmentEditForm segment={testSegment} />);

    const input = getByTestId("SegmentEditForm.originalText");
    expect(input).toHaveAttribute("readonly");
  });

  it("should disable all fields", () => {
    const { getByTestId } = render(
      <SegmentEditForm segment={testSegment} disabled />,
    );

    const originalText = getByTestId("SegmentEditForm.originalText");
    const machineTranslation = getByTestId(
      "SegmentEditForm.machineTranslation",
    );
    const manualTranslation = getByTestId("SegmentEditForm.manualTranslation");

    expect(originalText).toBeDisabled();
    expect(machineTranslation).toBeDisabled();
    expect(manualTranslation).toBeDisabled();
  });

  it("should set initial values", () => {
    const { getByTestId } = render(<SegmentEditForm segment={testSegment} />);

    const originalText = getByTestId("SegmentEditForm.originalText");
    const machineTranslation = getByTestId(
      "SegmentEditForm.machineTranslation",
    );
    const manualTranslation = getByTestId("SegmentEditForm.manualTranslation");

    expect(originalText).toHaveValue(testSegment.originalText);
    expect(machineTranslation).toHaveValue(testSegment.machineTranslation);
    expect(manualTranslation).toHaveValue(testSegment.manualTranslation);
  });

  it("should call onChange on values change", async () => {
    const onChange = vi.fn();

    const { getByTestId } = render(
      <SegmentEditForm segment={testSegment} onChange={onChange} />,
    );

    const machineTranslation = getByTestId(
      "SegmentEditForm.machineTranslation",
    );
    const manualTranslation = getByTestId("SegmentEditForm.manualTranslation");

    await userEvent.clear(machineTranslation);
    await userEvent.type(machineTranslation, "t");

    expect(onChange).toHaveBeenCalledWith(
      {
        originalText: testSegment.originalText,
        manualTranslation: testSegment.manualTranslation,
        machineTranslation: "t",
      },
      {
        originalText: testSegment.originalText,
        manualTranslation: testSegment.manualTranslation,
        machineTranslation: "",
      },
    );

    await userEvent.clear(manualTranslation);
    await userEvent.type(manualTranslation, "x");

    expect(onChange).toHaveBeenCalledWith(
      {
        originalText: testSegment.originalText,
        machineTranslation: "t",
        manualTranslation: "x",
      },
      {
        originalText: testSegment.originalText,
        machineTranslation: "t",
        manualTranslation: "",
      },
    );
  });
});
