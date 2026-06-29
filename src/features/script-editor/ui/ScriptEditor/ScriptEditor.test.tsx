import { render, resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import { useUserScriptStore } from "../../model/scriptStore/store";
import { ScriptEditor } from "./ScriptEditor";

const testCode = 'console.log("Test")';

describe("features/script-editor/ui/ScriptEditor", () => {
  afterEach(() => {
    resetStore(useUserScriptStore);
  });

  it("should show toolbar and code container", () => {
    const { getByTestId } = render(<ScriptEditor />);

    const toolbar = getByTestId("ScriptEditor.EditorToolbar");
    const codeContainer = getByTestId("ScriptEditor.CodeContainer");

    expect(toolbar).toBeInTheDocument();
    expect(codeContainer).toBeInTheDocument();
  });

  it("should show code from store", () => {
    useUserScriptStore.setState({ code: testCode });
    const { getByText } = render(<ScriptEditor />);

    const code = getByText(/Test/);
    expect(code).toBeInTheDocument();
  });
});
