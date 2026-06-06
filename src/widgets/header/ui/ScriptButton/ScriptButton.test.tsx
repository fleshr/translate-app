import { useTranslationProcessStore } from "@/features/translation-process";
import { render, resetStore } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ScriptButton } from "./ScriptButton";

describe("widgets/header/ui/ScriptButton", () => {
  afterEach(() => {
    resetStore(useTranslationProcessStore);
  });

  it("should be disabled when translating", () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { getByTestId } = render(<ScriptButton />);

    const button = getByTestId("ScriptButton");

    expect(button).toBeDisabled();
  });

  it("should open modal", async () => {
    const { getByTestId } = render(<ScriptButton />);

    const button = getByTestId("ScriptButton");

    expect(getByTestId("ScriptButton.Modal")).toBeEmptyDOMElement();

    await userEvent.click(button);

    expect(getByTestId("ScriptButton.Modal")).not.toBeEmptyDOMElement();
  });
});
