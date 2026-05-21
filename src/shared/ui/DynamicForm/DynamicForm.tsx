import type { BaseProps } from "@/shared/model/component";
import type { FormField } from "@/shared/model/form";
import { NumberInput, Stack, Textarea, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import type { ReactElement } from "react";
import { mapToObj } from "remeda";
import { z } from "zod";

export interface DynamicFormProps<
  Schema = z.ZodObject,
  Values = z.infer<Schema>,
> {
  formId?: string;
  schema?: Schema;
  fields: FormField[];
  initialValues?: Values;
  onSubmit: (config: Values) => void;
}

export const DynamicForm = (props: BaseProps<DynamicFormProps>) => {
  const {
    formId,
    fields,
    schema,
    onSubmit,
    initialValues = mapToObj(fields, ({ key, initial }) => [key, initial]),
    "data-testid": dataTestId = "DynamicForm",
  } = props;

  const form = useForm({
    validate: schema && schemaResolver(schema, { sync: true }),
    initialValues,
  });

  const renderInput = ({ key, type, label }: FormField): ReactElement => {
    switch (type) {
      case "text":
        return (
          <TextInput
            label={label}
            key={form.key(key)}
            data-testid={`${dataTestId}.${key}`}
            {...form.getInputProps(key)}
          />
        );

      case "number":
        return (
          <NumberInput
            label={label}
            key={form.key(key)}
            data-testid={`${dataTestId}.${key}`}
            {...form.getInputProps(key)}
          />
        );

      case "textarea":
        return (
          <Textarea
            autosize
            label={label}
            key={form.key(key)}
            data-testid={`${dataTestId}.${key}`}
            {...form.getInputProps(key)}
          />
        );

      default:
        // Exhaustiveness checking
        return type;
    }
  };

  return (
    <form
      id={formId}
      onSubmit={form.onSubmit(onSubmit)}
      data-testid={dataTestId}
    >
      <Stack gap="xs">{fields.map(renderInput)}</Stack>
    </form>
  );
};
