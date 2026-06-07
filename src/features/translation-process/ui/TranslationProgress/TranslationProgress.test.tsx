import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { TranslationProgress } from "./TranslationProgress";

describe("features/translation-process/ui/TranslationProgress", () => {
  beforeEach(() => {
    useTranslationStore.setState(getTranslationStoreStateMock());
  });

  afterEach(() => {
    resetStore(useTranslationProcessStore, useTranslationStore);
  });

  it("should display progress", () => {
    useTranslationProcessStore.setState({ translatingResource: "common-1" });
    const { getByTestId } = render(<TranslationProgress />);

    const resourcesProgress = getByTestId(
      "TranslationProgress.ResourcesProgressBar",
    );
    const segmentsProgress = getByTestId(
      "TranslationProgress.SegmentsProgressBar",
    );

    expect(resourcesProgress).toHaveTextContent("1/2");
    expect(segmentsProgress).toHaveTextContent("1/1");
  });

  it("should display only resources progress when translating resource not provided", () => {
    useTranslationProcessStore.setState({ translatingResource: null });
    const { queryByTestId } = render(<TranslationProgress />);

    const resourcesProgress = queryByTestId(
      "TranslationProgress.ResourcesProgressBar",
    );
    const segmentsProgress = queryByTestId(
      "TranslationProgress.SegmentsProgressBar",
    );

    expect(resourcesProgress).toHaveTextContent("1/2");
    expect(segmentsProgress).not.toBeInTheDocument();
  });
});
