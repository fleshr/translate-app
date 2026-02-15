import { render } from "@/shared/lib/testing";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SettingsButton } from "./SettingsButton";

describe("widgets/header/ui/SettingsButton", () => {
  it("button should open modal", async () => {
    const { getByTestId, queryByTestId } = render(<SettingsButton />);

    expect(queryByTestId("SettingsTabs")).not.toBeInTheDocument();
    await userEvent.click(getByTestId("SettingsButton"));
    expect(queryByTestId("SettingsTabs")).toBeInTheDocument();
  });
});
