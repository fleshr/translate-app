import { render } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BottomPanel } from "./BottomPanel";

describe("widgets/bottom-panel/ui/BottomPanel", () => {
  it("should show logs tab by default", () => {
    const { queryByTestId } = render(<BottomPanel />);

    const logsPlaceholder = queryByTestId("LogsContainer.Placeholder");
    expect(logsPlaceholder).toBeInTheDocument();
  });

  it("should switch to selected segment tab", async () => {
    const { getByTestId, queryByTestId } = render(<BottomPanel />);

    const button = getByTestId("BottomPanel.SegmentEditorTab");
    await userEvent.click(button);

    const editorPlaceholder = queryByTestId("LogsContainer.Placeholder");
    expect(editorPlaceholder).toBeInTheDocument();
  });

  it("should switch to raw json tab", async () => {
    const { getByTestId, queryByTestId } = render(<BottomPanel />);

    const button = getByTestId("BottomPanel.SegmentRawTab");
    await userEvent.click(button);

    const codePlaceholder = queryByTestId("SelectedSegmentRawJson.Placeholder");
    expect(codePlaceholder).toBeInTheDocument();
  });

  it("should switch back to logs tab", async () => {
    const { getByTestId, queryByTestId } = render(<BottomPanel />);

    const codeButton = getByTestId("BottomPanel.SegmentEditorTab");
    await userEvent.click(codeButton);

    const logsButton = getByTestId("BottomPanel.LogsTab");
    await userEvent.click(logsButton);

    const logsPlaceholder = queryByTestId("LogsContainer.Placeholder");
    expect(logsPlaceholder).toBeInTheDocument();
  });
});
