import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslationControl } from "./TranslationControl";

const { startMock, stopMock } = vi.hoisted(() => {
  return { startMock: vi.fn(), stopMock: vi.fn() };
});

vi.mock("../../lib/useTranslation/useTranslation", () => ({
  useTranslation: () => ({ start: startMock, stop: stopMock }),
}));

describe("features/translation/ui/TranslationControl", () => {
  beforeEach(() => {
    useTranslationStore.setState(getTranslationStoreStateMock());
    useSessionStore.setState(getSessionStoreStateMock());
  });

  afterEach(() => {
    resetStore(useSessionStore, useTranslationStore);
  });

  it("should show only start button when not translating", () => {
    const { queryByTestId } = render(<TranslationControl />);

    const startButton = queryByTestId("TranslationControl.StartButton");
    const stopButton = queryByTestId("TranslationControl.StopButton");

    expect(startButton).toBeInTheDocument();
    expect(stopButton).not.toBeInTheDocument();
  });

  it("should show stop button and correct progress bars when translating", () => {
    useSessionStore.setState({
      status: "translating",
      translatingResource: "file-1",
    });
    const { queryByTestId } = render(<TranslationControl />);

    const startButton = queryByTestId("TranslationControl.StartButton");
    const stopButton = queryByTestId("TranslationControl.StopButton");

    expect(startButton).not.toBeInTheDocument();
    expect(stopButton).toBeInTheDocument();

    const resourcesProgressBar = queryByTestId(
      "TranslationControl.ResourcesProgressBar",
    );
    const segmentsProgressBar = queryByTestId(
      "TranslationControl.SegmentsProgressBar",
    );

    expect(resourcesProgressBar).toHaveTextContent("1/2");
    expect(segmentsProgressBar).toHaveTextContent("1/2");
  });

  it("should not show segments progress if progress not provided", () => {
    useSessionStore.setState({
      status: "translating",
      translatingResource: null,
    });
    const { queryByTestId } = render(<TranslationControl />);

    const resourcesProgressBar = queryByTestId(
      "TranslationControl.ResourcesProgressBar",
    );
    const segmentsProgressBar = queryByTestId(
      "TranslationControl.SegmentsProgressBar",
    );

    expect(resourcesProgressBar).toBeInTheDocument();
    expect(segmentsProgressBar).not.toBeInTheDocument();
  });

  it("should call start translation on start button click", async () => {
    const { getByTestId } = render(<TranslationControl />);

    await userEvent.click(getByTestId("TranslationControl.StartButton"));

    expect(startMock).toHaveBeenCalled();
  });

  it("should call stop translation on stop button click", async () => {
    useSessionStore.setState({ status: "translating" });
    const { getByTestId } = render(<TranslationControl />);

    await userEvent.click(getByTestId("TranslationControl.StopButton"));

    expect(stopMock).toHaveBeenCalled();
  });
});
