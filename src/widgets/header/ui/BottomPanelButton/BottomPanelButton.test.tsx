import { render } from "@/shared/lib/testing";
import { toggleSettingsBottomPanel } from "@/shared/model/settingsStore";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BottomPanelButton } from "./BottomPanelButton";

vi.mock("@/shared/model/settingsStore", { spy: true });

describe("widgets/header/ui/BottomPanelButton", () => {
  it("should call toggleSettingsBottomPanel on click", async () => {
    const { getByTestId } = render(<BottomPanelButton />);

    const button = getByTestId("BottomPanelButton");
    await userEvent.click(button);

    expect(toggleSettingsBottomPanel).toHaveBeenCalled();
  });

  it("should show correct icon", async () => {
    const { getByTestId, queryByTestId } = render(<BottomPanelButton />);

    const button = getByTestId("BottomPanelButton.ShowIcon");

    expect(queryByTestId("BottomPanelButton.ShowIcon")).toBeInTheDocument();
    expect(queryByTestId("BottomPanelButton.HideIcon")).not.toBeInTheDocument();

    await userEvent.click(button);

    expect(queryByTestId("BottomPanelButton.ShowIcon")).not.toBeInTheDocument();
    expect(queryByTestId("BottomPanelButton.HideIcon")).toBeInTheDocument();
  });
});
