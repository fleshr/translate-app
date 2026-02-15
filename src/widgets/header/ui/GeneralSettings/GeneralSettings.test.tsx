import { render } from "@/shared/lib/testing";
import { useMantineColorScheme } from "@mantine/core";
import userEvent from "@testing-library/user-event";
import { useLocale } from "react-intlayer";
import { describe, expect, it, vi } from "vitest";
import { GeneralSettings } from "./GeneralSettings";

vi.mock("react-intlayer", { spy: true });
vi.mock("@mantine/core", { spy: true });

const setColorSchemeMock = vi.fn();
const setLocaleMock = vi.fn();

vi.mocked(useMantineColorScheme).mockImplementation(() => ({
  colorScheme: "light",
  clearColorScheme: vi.fn(),
  setColorScheme: setColorSchemeMock,
  toggleColorScheme: vi.fn(),
}));

vi.mocked(useLocale).mockImplementation(() => ({
  availableLocales: ["en", "ru"],
  defaultLocale: "en",
  locale: "en",
  setLocale: setLocaleMock,
}));

describe("widgets/header/ui/GeneralSettings", () => {
  it("should render selects with default values", () => {
    const { getByTestId } = render(<GeneralSettings />);

    const languageSelect = getByTestId("GeneralSettings.LanguageSelect");
    const themeSelect = getByTestId("GeneralSettings.ThemeSelect");

    expect(languageSelect).toHaveValue("English");
    expect(themeSelect).toHaveValue("Light");
  });

  it("should set theme and locale on save", async () => {
    const { getByTestId, getByRole } = render(<GeneralSettings />);

    const languageSelect = getByTestId("GeneralSettings.LanguageSelect");
    const themeSelect = getByTestId("GeneralSettings.ThemeSelect");
    const saveButton = getByTestId("GeneralSettings.SaveButton");

    await userEvent.click(languageSelect);
    await userEvent.click(getByRole("option", { name: "Russian" }));

    await userEvent.click(themeSelect);
    await userEvent.click(getByRole("option", { name: "Dark" }));

    await userEvent.click(saveButton);

    expect(setColorSchemeMock).toHaveBeenCalledWith("dark");
    expect(setLocaleMock).toHaveBeenCalledWith("ru");
  });
});
