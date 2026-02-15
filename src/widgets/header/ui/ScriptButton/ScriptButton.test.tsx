import { render } from "@/shared/lib/testing";
import { useSessionStore } from "@/shared/model/sessionStore";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ScriptButton } from "./ScriptButton";

describe("widgets/header/ui/ScriptButton", () => {
  afterEach(() => {
    useSessionStore.setState(useSessionStore.getInitialState());
  });

  it("should be disabled when translating", () => {
    useSessionStore.setState({ status: "translating" });
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
