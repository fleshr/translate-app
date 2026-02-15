import { render } from "@/shared/lib/testing";
import type { FormField } from "@/shared/model/form";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vitest } from "vitest";
import { z } from "zod";
import { DynamicForm } from "./DynamicForm";

const testSchema = z.object({
  testString: z.string(),
  testNumber: z.number(),
});

const testFields: FormField[] = [
  { key: "testString", type: "text", label: "testString" },
  { key: "testNumber", type: "number", label: "testNumber" },
];

const testInitialValues = {
  testString: "test",
  testNumber: 1,
};

describe("shared/ui/DynamicForm", () => {
  it("should render form with fields", () => {
    const onSubmit = vitest.fn();

    const { getByTestId } = render(
      <DynamicForm
        formId="test"
        fields={testFields}
        schema={testSchema}
        initialValues={testInitialValues}
        onSubmit={onSubmit}
      />,
    );

    const form = getByTestId("DynamicForm");
    const stringInput = getByTestId("DynamicForm.testString");
    const numberInput = getByTestId("DynamicForm.testNumber");

    expect(form).toHaveAttribute("id", "test");
    expect(stringInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
  });

  it("should not render unknown fields", () => {
    const onSubmit = vitest.fn();

    const { queryByTestId } = render(
      <DynamicForm
        formId="test"
        fields={[
          {
            key: "unknown",
            type: "unknown",
            label: "unknown",
          } as unknown as FormField,
        ]}
        schema={testSchema}
        initialValues={testInitialValues}
        onSubmit={onSubmit}
      />,
    );

    const unknownInput = queryByTestId("DynamicForm.unknown");
    expect(unknownInput).not.toBeInTheDocument();
  });

  it("should call onSubmit when form is submitted", async () => {
    const onSubmit = vitest.fn();

    const { getByTestId } = render(
      <DynamicForm
        formId="test"
        fields={testFields}
        schema={testSchema}
        initialValues={testInitialValues}
        onSubmit={onSubmit}
      />,
    );

    const form = getByTestId("DynamicForm");
    const stringInput = getByTestId("DynamicForm.testString");
    const numberInput = getByTestId("DynamicForm.testNumber");

    await userEvent.clear(stringInput);
    await userEvent.type(stringInput, "aboba");

    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, "123");

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledWith(
      { testString: "aboba", testNumber: 123 },
      expect.anything(),
    );
  });
});
