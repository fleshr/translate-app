import { render } from "@/shared/lib/testing";
import { useSessionStore } from "@/shared/model/sessionStore";
import { setSettingsSelectedTranslator } from "@/shared/model/settingsStore";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TranslatorSelect } from "./TranslatorSelect";

vi.mock("@/shared/model/settingsStore", { spy: true });

describe("widgets/header/ui/TranslatorSelect", () => {
  it("should be disabled when translating", () => {
    useSessionStore.setState({ status: "translating" });
    const { getByTestId } = render(<TranslatorSelect />);

    const select = getByTestId("TranslatorSelect");
    expect(select).toBeDisabled();
  });

  it("should display builtin translator", () => {
    const { getByText } = render(<TranslatorSelect />);

    const fake = getByText("Fake Translator");
    const openai = getByText("OpenAI Translator");

    expect(fake).toBeInTheDocument();
    expect(openai).toBeInTheDocument();
  });

  it("should set translator in settings store on change", async () => {
    const { getByText } = render(<TranslatorSelect />);

    const fake = getByText("Fake Translator");
    await userEvent.click(fake);

    expect(setSettingsSelectedTranslator).toHaveBeenCalledWith("fake");

    const openai = getByText("OpenAI Translator");
    await userEvent.click(openai);

    expect(setSettingsSelectedTranslator).toHaveBeenCalledWith("openai");
  });
});
