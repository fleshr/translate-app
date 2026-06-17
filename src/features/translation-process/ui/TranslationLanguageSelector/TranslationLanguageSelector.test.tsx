import { render, resetStore } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  setTranslationProcessSettingsSourceLanguage,
  setTranslationProcessSettingsTargetLanguage,
} from "../../model/settingsStore/actions";
import { useTranslationProcessSettingsStore } from "../../model/settingsStore/store";
import { TranslationLanguageSelector } from "./TranslationLanguageSelector";

vi.mock("../../model/settingsStore/actions", { spy: true });

describe("features/translation-process/ui/TranslationLanguageSelector", () => {
  afterEach(() => {
    resetStore(useTranslationProcessSettingsStore);
  });

  it("should render selects and button", () => {
    const { getByTestId } = render(<TranslationLanguageSelector />);

    const sourceSelect = getByTestId(
      "TranslationLanguageSelector.SourceLanguageSelect",
    );
    const targetSelect = getByTestId(
      "TranslationLanguageSelector.TargetLanguageSelect",
    );
    const swapButton = getByTestId(
      "TranslationLanguageSelector.SwapLanguagesButton",
    );

    expect(sourceSelect).toBeInTheDocument();
    expect(targetSelect).toBeInTheDocument();
    expect(swapButton).toBeInTheDocument();
  });

  it("should display selected languages by default", () => {
    const { getByTestId } = render(<TranslationLanguageSelector />);

    const sourceSelect = getByTestId(
      "TranslationLanguageSelector.SourceLanguageSelect",
    );
    const targetSelect = getByTestId(
      "TranslationLanguageSelector.TargetLanguageSelect",
    );

    expect(sourceSelect).toHaveValue("Japanese (日本語)");
    expect(targetSelect).toHaveValue("English (English)");
  });

  it("should swap languages", async () => {
    const { getByTestId } = render(<TranslationLanguageSelector />);

    const sourceSelect = getByTestId(
      "TranslationLanguageSelector.SourceLanguageSelect",
    );
    const targetSelect = getByTestId(
      "TranslationLanguageSelector.TargetLanguageSelect",
    );
    const swapButton = getByTestId(
      "TranslationLanguageSelector.SwapLanguagesButton",
    );

    await userEvent.click(swapButton);

    expect(setTranslationProcessSettingsSourceLanguage).toHaveBeenCalledWith(
      "en",
    );
    expect(setTranslationProcessSettingsTargetLanguage).toHaveBeenCalledWith(
      "ja",
    );
    expect(sourceSelect).toHaveValue("English (English)");
    expect(targetSelect).toHaveValue("Japanese (日本語)");
  });

  it("should select source language", async () => {
    const { getByTestId, getByRole } = render(<TranslationLanguageSelector />);

    const select = getByTestId(
      "TranslationLanguageSelector.SourceLanguageSelect",
    );
    await userEvent.click(select);

    const option = getByRole("option", { name: "Russian (русский)" });
    await userEvent.click(option);

    expect(setTranslationProcessSettingsSourceLanguage).toHaveBeenCalledWith(
      "ru",
    );
    expect(select).toHaveValue("Russian (русский)");
  });

  it("should select target language", async () => {
    const { getByTestId, getByRole } = render(<TranslationLanguageSelector />);

    const select = getByTestId(
      "TranslationLanguageSelector.TargetLanguageSelect",
    );
    await userEvent.click(select);

    const option = getByRole("option", { name: "Japanese (日本語)" });
    await userEvent.click(option);

    expect(setTranslationProcessSettingsTargetLanguage).toHaveBeenCalledWith(
      "ja",
    );
    expect(select).toHaveValue("Japanese (日本語)");
  });
});
