import * as translatorModule from "@/entities/translator";
import { setTranslatorConfig, useTranslatorStore } from "@/entities/translator";
import { getTranslatorMock } from "@/entities/translator/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslatorSettings } from "./TranslatorSettings";

vi.mock("@/entities/translator", { spy: true });

vi.spyOn(translatorModule, "translators", "get").mockReturnValue({
  test1: getTranslatorMock({
    name: "test1",
    configForm: {
      default: { test1: "initial value 1" },
      fields: [{ key: "test1", label: "Test Field 1", type: "text" }],
    },
  }),
  test2: getTranslatorMock({
    name: "test2",
    configForm: {
      default: { test2: "initial value 2" },
      fields: [{ key: "test2", label: "Test Field 2", type: "text" }],
    },
  }),
  test3: getTranslatorMock({ name: "test3" }),
});

describe("widgets/header/ui/TranslatorSettings", () => {
  beforeEach(() => {
    useTranslatorStore.setState({
      selected: "test1",
      configs: { test1: { test1: "test" } },
    });
  });

  afterEach(() => {
    resetStore(useTranslatorStore);
  });

  it("should not render TranslatorConfigForm when translator not found or dont have config form", () => {
    useTranslatorStore.setState({ selected: "test3", configs: {} });
    const { queryByTestId } = render(<TranslatorSettings />);

    const form = queryByTestId("TranslatorSettings.TranslatorConfigForm");
    expect(form).not.toBeInTheDocument();
  });

  it("should render selected translator", () => {
    const { getByTestId } = render(<TranslatorSettings />);

    const select = getByTestId("TranslatorSettings.TranslatorSelect");
    expect(select).toHaveValue("test1");

    const form = getByTestId("TranslatorSettings.TranslatorConfigForm");
    expect(form).toBeInTheDocument();
  });

  it("should render TranslatorConfigForm for selected translator", async () => {
    const { getByTestId, getByRole, queryByTestId } = render(
      <TranslatorSettings />,
    );

    let field1 = queryByTestId("TranslatorSettings.TranslatorConfigForm.test1");
    expect(field1).toBeInTheDocument();

    let field2 = queryByTestId("TranslatorSettings.TranslatorConfigForm.test2");
    expect(field2).not.toBeInTheDocument();

    const select = getByTestId("TranslatorSettings.TranslatorSelect");
    await userEvent.click(select);

    const option = getByRole("option", { name: "test2" });
    await userEvent.click(option);

    field1 = queryByTestId("TranslatorSettings.TranslatorConfigForm.test1");
    expect(field1).not.toBeInTheDocument();

    field2 = queryByTestId("TranslatorSettings.TranslatorConfigForm.test2");
    expect(field2).toBeInTheDocument();
  });

  it("should set config in store on submit", async () => {
    const { getByTestId } = render(<TranslatorSettings />);

    const field1 = getByTestId("TranslatorSettings.TranslatorConfigForm.test1");
    const button = getByTestId("TranslatorSettings.SaveButton");

    await userEvent.clear(field1);
    await userEvent.type(field1, "new value");
    await userEvent.click(button);

    expect(setTranslatorConfig).toHaveBeenCalledWith("test1", {
      test1: "new value",
    });

    await userEvent.clear(field1);
    await userEvent.type(field1, "test");
    await userEvent.click(button);

    expect(setTranslatorConfig).toHaveBeenCalledWith("test1", {
      test1: "test",
    });
  });
});
