import { render, resetStore } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { useTranslationProcessSettingsStore } from "../../model/settingsStore/store";
import { TranslationModeSelector } from "./TranslationModeSelector";

describe("features/translation-process/ui/TranslationModeSelector", () => {
  afterEach(() => {
    resetStore(useTranslationProcessStore, useTranslationProcessSettingsStore);
  });

  it("should be disabled when translating", () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { getByTestId } = render(<TranslationModeSelector />);

    const button = getByTestId("TranslationModeSelector");
    expect(button).toBeDisabled();
  });

  it("should not be disabled when idle", () => {
    useTranslationProcessStore.setState({ status: "idle" });
    const { getByTestId } = render(<TranslationModeSelector />);

    const button = getByTestId("TranslationModeSelector");
    expect(button).not.toBeDisabled();
  });

  it("should show correct icon", () => {
    const { queryByTestId } = render(<TranslationModeSelector />);

    const sequentialIcon = queryByTestId(
      "TranslationModeSelector.SequentialIcon",
    );
    const batchIcon = queryByTestId("TranslationModeSelector.BatchIcon");

    expect(sequentialIcon).toBeInTheDocument();
    expect(batchIcon).not.toBeInTheDocument();
  });

  it("should correct display selected mode in menu", async () => {
    useTranslationProcessSettingsStore.setState({ mode: "batch" });
    const { getByTestId } = render(<TranslationModeSelector />);

    const button = getByTestId("TranslationModeSelector");
    await userEvent.click(button);

    const sequentialCheckbox = getByTestId(
      "TranslationModeSelector.CheckboxItem.Sequential",
    );
    const batchCheckbox = getByTestId(
      "TranslationModeSelector.CheckboxItem.Batch",
    );

    expect(sequentialCheckbox).not.toBeChecked();
    expect(batchCheckbox).toBeChecked();
  });
});
