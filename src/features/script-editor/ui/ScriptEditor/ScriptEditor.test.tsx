import {
  selectSegments,
  setTranslationSegments,
  useTranslationStore,
} from "@/entities/translation";
import { getTranslationSegmentMock } from "@/entities/translation/mocks";
import { render } from "@/shared/lib/testing";
import { notifications } from "@mantine/notifications";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fileOpen, fileSave } from "browser-fs-access";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ScriptEditor } from "./ScriptEditor";

const testCode =
  'return async function script(segment) { if (segment.id === "segment-1") { segment.originalText = "test"; } }';

const mockedFileOpen = vi
  .mocked(fileOpen)
  .mockResolvedValue(new File([testCode], "file.js"));

const segments = [
  { ...getTranslationSegmentMock(), id: "segment-1" },
  { ...getTranslationSegmentMock(), id: "segment-2" },
];
vi.mock("@/entities/translation");
vi.mocked(selectSegments).mockReturnValue(segments);

describe("features/script-editor/ui/ScriptEditor", () => {
  afterEach(() => {
    useTranslationStore.setState(useTranslationStore.getInitialState());
  });

  it("should open script from file", async () => {
    const { getByTestId } = render(<ScriptEditor />);

    const button = getByTestId("ScriptEditor.OpenScriptButton");
    const code = getByTestId("ScriptEditor.CodeContainer");

    await act(async () => {
      await userEvent.click(button);
    });

    expect(mockedFileOpen).toHaveBeenCalled();
    expect(code).toHaveTextContent(testCode);
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should save script to file", async () => {
    const { getByTestId, getByRole } = render(<ScriptEditor />);

    const button = getByTestId("ScriptEditor.SaveScriptButton");
    const textbox = getByRole("textbox");

    await userEvent.type(textbox, "{Control>}[KeyA]{/Control}{Delete}");
    await userEvent.type(textbox, "test");
    await userEvent.click(button);

    expect(notifications.show).toHaveBeenCalled();
    expect(fileSave).toHaveBeenCalledWith(new Blob(["test"]), {
      fileName: "script.js",
    });
  });

  it("should run script and update store with not changed segments", async () => {
    const { getByTestId } = render(<ScriptEditor />);

    const openButton = getByTestId("ScriptEditor.OpenScriptButton");
    const runButton = getByTestId("ScriptEditor.RunScriptButton");

    await userEvent.click(openButton);
    await userEvent.click(runButton);

    expect(notifications.show).toHaveBeenCalled();
    expect(setTranslationSegments).toHaveBeenCalledWith([
      { ...segments[0], originalText: "test" },
    ]);
  });

  it("should catch script execution error", async () => {
    mockedFileOpen.mockResolvedValue(new File(["not a function"], "file.js"));

    const { getByTestId } = render(<ScriptEditor />);

    const openButton = getByTestId("ScriptEditor.OpenScriptButton");
    const runButton = getByTestId("ScriptEditor.RunScriptButton");

    await userEvent.click(openButton);
    await userEvent.click(runButton);

    expect(notifications.show).toHaveBeenCalled();
    expect(setTranslationSegments).not.toHaveBeenCalled();
  });
});
