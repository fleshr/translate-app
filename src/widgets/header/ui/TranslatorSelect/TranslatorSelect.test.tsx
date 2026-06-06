import * as translatorModule from "@/entities/translator";
import {
  setSelectedTranslator,
  useTranslatorStore,
} from "@/entities/translator";
import { getTranslatorMock } from "@/entities/translator/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { render, resetStore } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslatorSelect } from "./TranslatorSelect";

vi.mock("@/entities/translator", { spy: true });

vi.spyOn(translatorModule, "translators", "get").mockReturnValue({
  test1: getTranslatorMock({ name: "test1" }),
  test2: getTranslatorMock({ name: "test2" }),
});

describe("widgets/header/ui/TranslatorSelect", () => {
  beforeEach(() => {
    useTranslatorStore.setState({ selected: "test1", configs: {} });
  });

  afterEach(() => {
    resetStore(useTranslationProcessStore, useTranslatorStore);
  });

  it("should be disabled when translating", () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { getByTestId } = render(<TranslatorSelect />);

    const select = getByTestId("TranslatorSelect");
    expect(select).toBeDisabled();
  });

  it("should display selected translator by default", () => {
    const { getByTestId } = render(<TranslatorSelect />);

    const select = getByTestId("TranslatorSelect");
    expect(select).toHaveValue("test1");
  });

  it("should display builtin translator", async () => {
    const { getByTestId, queryByRole } = render(<TranslatorSelect />);

    const select = getByTestId("TranslatorSelect");
    await userEvent.click(select);

    const option1 = queryByRole("option", { name: "test1" });
    expect(option1).toBeInTheDocument();

    const option2 = queryByRole("option", { name: "test2" });
    expect(option2).toBeInTheDocument();
  });

  it("should set translator in settings store on change", async () => {
    const { getByTestId, getByRole } = render(<TranslatorSelect />);

    const select = getByTestId("TranslatorSelect");
    await userEvent.click(select);

    const option = getByRole("option", { name: "test2" });
    await userEvent.click(option);

    expect(setSelectedTranslator).toHaveBeenCalledWith("test2");
  });
});
