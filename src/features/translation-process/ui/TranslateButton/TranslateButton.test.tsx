import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { TranslateButton } from "./TranslateButton";

const { startMock, stopMock } = vi.hoisted(() => {
  return { startMock: vi.fn(), stopMock: vi.fn() };
});

vi.mock(
  import("../../lib/useTranslationProcess/useTranslationProcess"),
  () => ({
    useTranslationProcess: () => ({ start: startMock, stop: stopMock }),
  }),
);

describe("features/translation-process/ui/TranslateButton", () => {
  beforeEach(() => {
    useTranslationStore.setState(getTranslationStoreStateMock());
  });

  afterEach(() => {
    resetStore(useTranslationProcessStore, useTranslationStore);
  });

  it("should show start icon when not translating", () => {
    useTranslationProcessStore.setState({ status: "idle" });
    const { queryByTestId } = render(<TranslateButton />);

    const startIcon = queryByTestId("TranslateButton.StartIcon");
    const stopIcon = queryByTestId("TranslateButton.StopIcon");

    expect(startIcon).toBeInTheDocument();
    expect(stopIcon).not.toBeInTheDocument();
  });

  it("should show stop icon when translating", () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { queryByTestId } = render(<TranslateButton />);

    const startIcon = queryByTestId("TranslateButton.StartIcon");
    const stopIcon = queryByTestId("TranslateButton.StopIcon");

    expect(startIcon).not.toBeInTheDocument();
    expect(stopIcon).toBeInTheDocument();
  });

  it("should start translation when is not translating", async () => {
    useTranslationProcessStore.setState({ status: "idle" });
    const { getByTestId } = render(<TranslateButton />);

    const button = getByTestId("TranslateButton");
    await userEvent.click(button);

    expect(startMock).toHaveBeenCalled();
  });

  it("should stop translation when is translating", async () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { getByTestId } = render(<TranslateButton />);

    const button = getByTestId("TranslateButton");
    await userEvent.click(button);

    expect(stopMock).toHaveBeenCalled();
  });
});
