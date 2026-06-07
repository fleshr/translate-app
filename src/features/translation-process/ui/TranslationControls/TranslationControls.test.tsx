import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { TranslationControls } from "./TranslationControls";

describe("features/translation-process/ui/TranslationControls", () => {
  beforeEach(() => {
    useTranslationStore.setState(getTranslationStoreStateMock());
  });

  afterEach(() => {
    resetStore(useTranslationProcessStore, useTranslationStore);
  });

  it("should show button, selector and progress when translating", () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { queryByTestId } = render(<TranslationControls />);

    const button = queryByTestId("TranslationControls.TranslateButton");
    const selector = queryByTestId(
      "TranslationControls.TranslationModeSelector",
    );
    const progress = queryByTestId("TranslationControls.TranslationProgress");

    expect(button).toBeInTheDocument();
    expect(selector).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
  });

  it("should show only button and selector when not translating", () => {
    useTranslationProcessStore.setState({ status: "idle" });
    const { queryByTestId } = render(<TranslationControls />);

    const button = queryByTestId("TranslationControls.TranslateButton");
    const selector = queryByTestId(
      "TranslationControls.TranslationModeSelector",
    );
    const progress = queryByTestId("TranslationControls.TranslationProgress");

    expect(button).toBeInTheDocument();
    expect(selector).toBeInTheDocument();
    expect(progress).not.toBeInTheDocument();
  });
});
