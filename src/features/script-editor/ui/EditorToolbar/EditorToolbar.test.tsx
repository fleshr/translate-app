import {
  setTranslationSegments,
  useTranslationStore,
} from "@/entities/translation";
import {
  getTranslationSegmentMock,
  getTranslationStoreStateMock,
} from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileOpen, fileSave } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { applyFunctionToSegments } from "../../lib/applyFunctionToSegments";
import { setUserScriptCode } from "../../model/scriptStore/actions";
import { useUserScriptStore } from "../../model/scriptStore/store";
import { EditorToolbar } from "./EditorToolbar";

const testCode = 'return async function () { console.log("Test") }';
const testSegment = getTranslationSegmentMock();

vi.mock("@/entities/translation", { spy: true });
vi.mock("../../model/scriptStore/actions", { spy: true });
vi.mock("../../lib/applyFunctionToSegments", { spy: true });

describe("features/script-editor/ui/EditorToolbar", () => {
  beforeEach(() => {
    useUserScriptStore.setState({ code: testCode });
    useTranslationStore.setState(getTranslationStoreStateMock());
  });

  afterEach(() => {
    resetStore(useUserScriptStore, useTranslationStore);
  });

  it("should show buttons", () => {
    const { getByTestId } = render(<EditorToolbar />);

    const openButton = getByTestId("EditorToolbar.OpenScriptButton");
    const saveButton = getByTestId("EditorToolbar.SaveScriptButton");
    const executeButton = getByTestId("EditorToolbar.ExecuteScriptButton");
    const debugButton = getByTestId("EditorToolbar.DebugScriptButton");

    expect(openButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(executeButton).toBeInTheDocument();
    expect(debugButton).toBeInTheDocument();
  });

  it("should open script from file", async () => {
    vi.mocked(fileOpen).mockResolvedValue(new File([testCode], "script.js"));
    const { getByTestId } = render(<EditorToolbar />);

    const button = getByTestId("EditorToolbar.OpenScriptButton");
    await userEvent.click(button);

    expect(fileOpen).toHaveBeenCalled();
    expect(setUserScriptCode).toHaveBeenCalledWith(testCode);
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should show error on file open error", async () => {
    vi.mocked(fileOpen).mockRejectedValue(new Error("Error"));
    const { getByTestId } = render(<EditorToolbar />);

    const button = getByTestId("EditorToolbar.OpenScriptButton");
    await userEvent.click(button);

    expect(fileOpen).toHaveBeenCalled();
    expect(setUserScriptCode).not.toHaveBeenCalledWith(testCode);
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should save script to file", async () => {
    const { getByTestId } = render(<EditorToolbar />);

    const button = getByTestId("EditorToolbar.SaveScriptButton");
    await userEvent.click(button);

    expect(fileSave).toHaveBeenCalledWith(new Blob([testCode]), {
      fileName: "script.js",
    });
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should show error on file save error", async () => {
    vi.mocked(fileSave).mockRejectedValue(new Error("Error"));
    const { getByTestId } = render(<EditorToolbar />);

    const button = getByTestId("EditorToolbar.SaveScriptButton");
    await userEvent.click(button);

    expect(notifications.show).toHaveBeenCalled();
  });

  it("should execute script on segments", async () => {
    vi.mocked(applyFunctionToSegments).mockResolvedValue([testSegment]);
    const { getByTestId } = render(<EditorToolbar />);

    const button = getByTestId("EditorToolbar.ExecuteScriptButton");
    await userEvent.click(button);

    expect(applyFunctionToSegments).toHaveBeenCalledWith(
      [
        expect.objectContaining({ id: "segment-1" }),
        expect.objectContaining({ id: "segment-2" }),
        expect.objectContaining({ id: "segment-3" }),
      ],
      expect.any(Function),
    );
    expect(setTranslationSegments).toHaveBeenCalledWith([testSegment]);
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should show error on script execution error", async () => {
    vi.mocked(applyFunctionToSegments).mockRejectedValue(new Error("Error"));
    const { getByTestId } = render(<EditorToolbar />);

    const button = getByTestId("EditorToolbar.ExecuteScriptButton");
    await userEvent.click(button);

    expect(setTranslationSegments).not.toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });
});
