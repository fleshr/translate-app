import { render } from "@/shared/lib/testing";
import type { FormField } from "@/shared/model/form";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vitest } from "vitest";
import { z } from "zod";
import { DynamicForm } from "./DynamicForm";

const testFields: FormField[] = [
  {
    key: "text",
    type: "text",
    label: "Text field",
  },
  {
    key: "number",
    type: "number",
    label: "Number field",
  },
  {
    key: "textarea",
    type: "textarea",
    label: "Textarea field",
  },
  {
    key: "select",
    type: "select",
    label: "Select field",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
  },
];

const testSchema = z.object({
  text: z.string().min(3),
  number: z.number(),
  textarea: z.string(),
  select: z.string(),
});

const testInitialValues = {
  text: "test",
  number: 100,
  textarea: "very\nlong\ntext",
  select: "option2",
};

describe("shared/ui/DynamicForm", () => {
  it("should assign id to form", () => {
    const { getByTestId } = render(
      <DynamicForm formId="test" fields={testFields} />,
    );

    const form = getByTestId("DynamicForm");
    expect(form).toHaveAttribute("id", "test");
  });

  it("should render form with fields", () => {
    const { getByTestId } = render(<DynamicForm fields={testFields} />);

    const textInput = getByTestId("DynamicForm.text");
    expect(textInput).toBeInTheDocument();

    const numberInput = getByTestId("DynamicForm.number");
    expect(numberInput).toBeInTheDocument();

    const textareaInput = getByTestId("DynamicForm.textarea");
    expect(textareaInput).toBeInTheDocument();

    const selectInput = getByTestId("DynamicForm.select");
    expect(selectInput).toBeInTheDocument();
  });

  it("should not render unknown fields", () => {
    const onSubmit = vitest.fn();
    const { queryByTestId } = render(
      <DynamicForm
        fields={[
          {
            key: "unknown",
            type: "unknown",
            label: "unknown",
          } as unknown as FormField,
        ]}
        onSubmit={onSubmit}
      />,
    );

    const unknownInput = queryByTestId("DynamicForm.unknown");
    expect(unknownInput).not.toBeInTheDocument();
  });

  it("should use initial values", () => {
    const { getByTestId } = render(
      <DynamicForm fields={testFields} initialValues={testInitialValues} />,
    );

    const textInput = getByTestId("DynamicForm.text");
    expect(textInput).toHaveValue("test");

    const numberInput = getByTestId("DynamicForm.number");
    expect(numberInput).toHaveValue("100");

    const textareaInput = getByTestId("DynamicForm.textarea");
    expect(textareaInput).toHaveValue("very\nlong\ntext");

    const selectInput = getByTestId("DynamicForm.select");
    expect(selectInput).toHaveValue("Option 2");
  });

  it("should validate form", async () => {
    const onSubmit = vitest.fn();
    const { getByTestId, getByText } = render(
      <DynamicForm
        fields={testFields}
        schema={testSchema}
        onSubmit={onSubmit}
      />,
    );

    const textInput = getByTestId("DynamicForm.text");
    await userEvent.clear(textInput);
    await userEvent.type(textInput, "a");

    const form = getByTestId("DynamicForm");
    fireEvent.submit(form);

    const error = getByText(/Too small/);
    expect(error).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalledWith();
  });

  it("should call onSubmit when form is submitted", async () => {
    const onSubmit = vitest.fn();

    const { getByTestId, getByRole } = render(
      <DynamicForm fields={testFields} onSubmit={onSubmit} />,
    );

    const textInput = getByTestId("DynamicForm.text");
    await userEvent.clear(textInput);
    await userEvent.type(textInput, "a");

    const numberInput = getByTestId("DynamicForm.number");
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, "1");

    const textareaInput = getByTestId("DynamicForm.textarea");
    await userEvent.clear(textareaInput);
    await userEvent.type(textareaInput, "b");

    const selectInput = getByTestId("DynamicForm.select");
    await userEvent.click(selectInput);
    const selectOption = getByRole("option", { name: "Option 2" });
    await userEvent.click(selectOption);

    const form = getByTestId("DynamicForm");
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledWith(
      {
        text: "a",
        number: 1,
        textarea: "b",
        select: "option2",
      },
      expect.anything(),
    );
  });
});
