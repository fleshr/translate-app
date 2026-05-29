import { render, resetStore } from "@/shared/lib/testing";
import { getTranslatorMock } from "@/shared/mocks/translator";
import {
  setSettingsTranslatorConfig,
  useSettingsStore,
} from "@/shared/model/settingsStore";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslatorSettings } from "./TranslatorSettings";

vi.mock("@/shared/model/settingsStore", { spy: true });

vi.mock(import("@/shared/constants/translators"), () => ({
  translators: {
    test1: getTranslatorMock({
      name: "test1",
      configFields: [
        {
          key: "testField1",
          label: "Test Field 1",
          type: "text",
          initial: "initial value 1",
        },
      ],
    }),
    test2: getTranslatorMock({
      name: "test2",
      configFields: [
        {
          key: "testField2",
          label: "Test Field 2",
          type: "text",
          initial: "initial value 2",
        },
      ],
    }),
  },
}));

describe("widgets/header/ui/TranslatorSettings", () => {
  beforeEach(() => {
    useSettingsStore.setState({
      translator: {
        selected: "test1",
        configs: { test1: { testField1: "test" } },
      },
    });
  });

  afterEach(() => {
    resetStore(useSettingsStore);
  });

  it("should not render DynamicForm when translator is not found", () => {
    useSettingsStore.setState({
      translator: { selected: "test3", configs: {} },
    });
    const { queryByTestId } = render(<TranslatorSettings />);

    const dynamicForm = queryByTestId("TranslatorSettings.DynamicForm");
    expect(dynamicForm).not.toBeInTheDocument();
  });

  it("should render selected translator", () => {
    const { getByTestId } = render(<TranslatorSettings />);

    const select = getByTestId("TranslatorSettings.TranslatorSelect");
    expect(select).toHaveValue("test1");

    const dynamicForm = getByTestId("TranslatorSettings.DynamicForm");
    expect(dynamicForm).toBeInTheDocument();
  });

  it("should render DynamicForm for selected translator", async () => {
    const { getByTestId, getByRole, queryByTestId } = render(
      <TranslatorSettings />,
    );

    let field1 = queryByTestId("TranslatorSettings.DynamicForm.testField1");
    expect(field1).toBeInTheDocument();

    let field2 = queryByTestId("TranslatorSettings.DynamicForm.testField2");
    expect(field2).not.toBeInTheDocument();

    const select = getByTestId("TranslatorSettings.TranslatorSelect");
    await userEvent.click(select);

    const option = getByRole("option", { name: "test2" });
    await userEvent.click(option);

    field1 = queryByTestId("TranslatorSettings.DynamicForm.testField1");
    expect(field1).not.toBeInTheDocument();

    field2 = queryByTestId("TranslatorSettings.DynamicForm.testField2");
    expect(field2).toBeInTheDocument();
  });

  it("should set config in store on submit", async () => {
    const { getByTestId } = render(<TranslatorSettings />);

    const field1 = getByTestId("TranslatorSettings.DynamicForm.testField1");
    await userEvent.clear(field1);
    await userEvent.type(field1, "new value");

    const button = getByTestId("TranslatorSettings.SaveButton");
    await userEvent.click(button);

    expect(setSettingsTranslatorConfig).toHaveBeenCalledWith("test1", {
      testField1: "new value",
    });
  });
});
