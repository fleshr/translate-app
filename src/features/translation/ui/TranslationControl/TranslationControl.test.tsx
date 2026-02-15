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
    useSessionStore.setState(getSessionStoreStateMock());
  });

  afterEach(() => {
    resetStore(useSessionStore);
  });

  it("should show only start button when not translating", () => {
    const { queryByTestId } = render(<TranslationControl />);

    expect(queryByTestId("TranslationControl.StartButton")).toBeInTheDocument();
    expect(
      queryByTestId("TranslationControl.StopButton"),
    ).not.toBeInTheDocument();
    expect(
      queryByTestId("TranslationControl.TotalProgressBar"),
    ).not.toBeInTheDocument();
    expect(
      queryByTestId("TranslationControl.ResourceProgressBar"),
    ).not.toBeInTheDocument();
  });

  it("should show stop button and correct progress bars when translating", () => {
    useSessionStore.setState({
      status: "translating",
      translatingResource: "file-1",
    });
    const { queryByTestId, getByText } = render(<TranslationControl />);

    expect(
      queryByTestId("TranslationControl.StartButton"),
    ).not.toBeInTheDocument();
    expect(queryByTestId("TranslationControl.StopButton")).toBeInTheDocument();
    expect(
      queryByTestId("TranslationControl.TotalProgressBar"),
    ).toBeInTheDocument();
    expect(
      queryByTestId("TranslationControl.ResourceProgressBar"),
    ).toBeInTheDocument();

    expect(getByText("1/2")).toBeInTheDocument();
    expect(getByText("5/20")).toBeInTheDocument();
  });

  it("should not show resource progress if not exists", () => {
    useSessionStore.setState({
      status: "translating",
      translatingResource: null,
    });
    const { queryByTestId } = render(<TranslationControl />);

    expect(
      queryByTestId("TranslationControl.TotalProgressBar"),
    ).toBeInTheDocument();
    expect(
      queryByTestId("TranslationControl.ResourceProgressBar"),
    ).not.toBeInTheDocument();
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
