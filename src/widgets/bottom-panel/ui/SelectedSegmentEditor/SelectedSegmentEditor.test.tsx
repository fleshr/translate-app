import {
  setTranslationSegmentField,
  useTranslationStore,
} from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SelectedSegmentEditor } from "./SelectedSegmentEditor";

vi.mock("@/entities/translation", { spy: true });

describe("widgets/bottom-panel/ui/SelectedSegmentEditor", () => {
  beforeEach(() => {
    useSessionStore.setState(
      getSessionStoreStateMock({ selectedSegment: "segment-1" }),
    );
    useTranslationStore.setState(getTranslationStoreStateMock());
  });

  afterEach(() => {
    resetStore(useTranslationStore, useSessionStore);
  });

  it("should show placeholder if no selected segment", () => {
    useSessionStore.setState({ selectedSegment: null });

    const { queryByTestId } = render(<SelectedSegmentEditor />);

    const placeholder = queryByTestId("SelectedSegmentEditor.Placeholder");
    const form = queryByTestId("SegmentEditForm");

    expect(placeholder).toBeInTheDocument();
    expect(form).not.toBeInTheDocument();
  });

  it("should show form if selected segment", () => {
    const { queryByTestId } = render(<SelectedSegmentEditor />);

    const placeholder = queryByTestId("SelectedSegmentEditor.Placeholder");
    const form = queryByTestId("SegmentEditForm");

    expect(placeholder).not.toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it("should disable form if translating", () => {
    useSessionStore.setState({ status: "translating" });

    const { getByTestId } = render(<SelectedSegmentEditor />);

    const input = getByTestId("SegmentEditForm.originalText");
    expect(input).toBeDisabled();
  });

  it("should change segment with debounce and change only changed field", async () => {
    const { getByTestId } = render(<SelectedSegmentEditor />);

    const input = getByTestId("SegmentEditForm.manualTranslation");

    await userEvent.clear(input);
    await userEvent.type(input, "ww");

    await waitFor(() => {
      expect(setTranslationSegmentField).toHaveBeenNthCalledWith(
        1,
        "segment-1",
        "ww",
        "manualTranslation",
      );
    });
  });
});
