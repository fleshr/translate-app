import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SelectedSegmentRawJson } from "./SelectedSegmentRawJson";

describe("widgets/bottom-panel/ui/SelectedSegmentRawJson", () => {
  beforeEach(() => {
    useSessionStore.setState(getSessionStoreStateMock());
    useTranslationStore.setState(getTranslationStoreStateMock());
  });

  afterEach(() => {
    resetStore(useTranslationStore, useSessionStore);
  });

  it("should show placeholder if no selected segment", () => {
    const { queryByTestId } = render(<SelectedSegmentRawJson />);

    const placeholder = queryByTestId("SelectedSegmentRawJson.Placeholder");
    const code = queryByTestId("SelectedSegmentRawJson");

    expect(placeholder).toBeInTheDocument();
    expect(code).not.toBeInTheDocument();
  });

  it("should show form if selected segment", () => {
    useSessionStore.setState({ selectedSegment: "segment-1" });

    const { queryByTestId } = render(<SelectedSegmentRawJson />);

    const placeholder = queryByTestId("SelectedSegmentRawJson.Placeholder");
    const code = queryByTestId("SelectedSegmentRawJson");

    expect(placeholder).not.toBeInTheDocument();
    expect(code).toBeInTheDocument();
  });
});
