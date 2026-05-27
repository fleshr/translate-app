import { render, resetStore } from "@/shared/lib/testing";
import { useSessionStore } from "@/shared/model/sessionStore";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { SettingsTabs } from "./SettingsTabs";

describe("widgets/header/ui/SettingsTabs", () => {
  afterEach(() => {
    resetStore(useSessionStore);
  });

  it("general settings tab opened by default", () => {
    const { getByTestId } = render(<SettingsTabs />);

    const generalSettings = getByTestId("GeneralSettings");
    expect(generalSettings).toBeInTheDocument();
  });

  it("should open translator settings tab", async () => {
    const { getByTestId } = render(<SettingsTabs />);

    await userEvent.click(getByTestId("SettingsTabs.TranslatorTab"));
    expect(getByTestId("TranslatorSettings")).toBeInTheDocument();
  });

  it("should open parsers manager tab", async () => {
    const { getByTestId } = render(<SettingsTabs />);

    await userEvent.click(getByTestId("SettingsTabs.ParsersTab"));
    expect(getByTestId("ParsersManager")).toBeInTheDocument();
  });

  it("translator and parsers tabs should be disabled when translating", () => {
    useSessionStore.setState({ status: "translating" });
    const { getByTestId } = render(<SettingsTabs />);

    expect(getByTestId("SettingsTabs.TranslatorTab")).toBeDisabled();
    expect(getByTestId("SettingsTabs.ParsersTab")).toBeDisabled();
  });
});
