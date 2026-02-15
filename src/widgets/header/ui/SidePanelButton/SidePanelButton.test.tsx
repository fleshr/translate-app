import { render } from "@/shared/lib/testing";
import { toggleSettingsSidePanel } from "@/shared/model/settingsStore";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SidePanelButton } from "./SidePanelButton";

vi.mock("@/shared/model/settingsStore", { spy: true });

describe("widgets/header/ui/SidePanelButton", () => {
  it("should call toggleSettingsSidePanel on click", async () => {
    const { getByTestId } = render(<SidePanelButton />);

    const button = getByTestId("SidePanelButton");
    await userEvent.click(button);

    expect(toggleSettingsSidePanel).toHaveBeenCalled();
  });

  it("should show correct icon", async () => {
    const { getByTestId, queryByTestId } = render(<SidePanelButton />);

    const button = getByTestId("SidePanelButton.ShowIcon");

    expect(queryByTestId("SidePanelButton.ShowIcon")).toBeInTheDocument();
    expect(queryByTestId("SidePanelButton.HideIcon")).not.toBeInTheDocument();

    await userEvent.click(button);

    expect(queryByTestId("SidePanelButton.ShowIcon")).not.toBeInTheDocument();
    expect(queryByTestId("SidePanelButton.HideIcon")).toBeInTheDocument();
  });
});
