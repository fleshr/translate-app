import {
  useTranslatorStore,
  type TranslatorConfigForm as TranslatorConfigFormType,
} from "@/entities/translator";
import { render, resetStore } from "@/shared/lib/testing";
import { fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TranslatorConfigForm } from "./TranslatorConfigForm";

const testConfigForm: TranslatorConfigFormType = {
  default: { testField1: "initial value 1" },
  fields: [{ key: "testField1", label: "Test Field 1", type: "text" }],
};

describe("widgets/header/ui/TranslatorConfigForm", () => {
  afterEach(() => {
    resetStore(useTranslatorStore);
  });

  it("should render with store config", () => {
    useTranslatorStore.setState({
      selected: "test1",
      configs: { test1: { testField1: "test" } },
    });

    const { getByTestId } = render(
      <TranslatorConfigForm translator="test1" configForm={testConfigForm} />,
    );

    const field1 = getByTestId("TranslatorConfigForm.testField1");
    expect(field1).toHaveValue("test");
  });

  it("should render with default config", () => {
    const { getByTestId } = render(
      <TranslatorConfigForm translator="test1" configForm={testConfigForm} />,
    );

    const field1 = getByTestId("TranslatorConfigForm.testField1");
    expect(field1).toHaveValue("initial value 1");
  });

  it("should call onSubmit", () => {
    const onSubmit = vi.fn();
    const { getByTestId } = render(
      <TranslatorConfigForm
        translator="test1"
        configForm={testConfigForm}
        onSubmit={onSubmit}
      />,
    );

    const form = getByTestId("TranslatorConfigForm");
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledWith(
      { testField1: "initial value 1" },
      expect.anything(),
    );
  });
});
