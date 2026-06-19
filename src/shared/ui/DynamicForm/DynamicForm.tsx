import type { BaseProps } from "@/shared/model/component";
import type { FormField } from "@/shared/model/form";
import { NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import type { ReactElement } from "react";
import { z } from "zod";

export interface DynamicFormProps<
  Schema = z.ZodObject,
  Values = z.infer<Schema>,
> {
  formId?: string;
  schema?: Schema;
  fields: FormField[];
  initialValues?: Values;
  onSubmit?: (config: Values) => void;
}

export const DynamicForm = (props: BaseProps<DynamicFormProps>) => {
  const {
    formId,
    fields,
    schema,
    onSubmit,
    initialValues,
    "data-testid": dataTestId = "DynamicForm",
  } = props;

  const form = useForm({
    validate: schema && schemaResolver(schema, { sync: true }),
    initialValues,
  });

  const renderInput = (field: FormField): ReactElement => {
    const { type, label, key, description } = field;

    switch (type) {
      case "text":
        return (
          <TextInput
            label={label}
            description={description}
            key={form.key(key)}
            data-testid={`${dataTestId}.${key}`}
            {...form.getInputProps(key)}
          />
        );

      case "number":
        return (
          <NumberInput
            label={label}
            description={description}
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
            description={description}
            key={form.key(key)}
            data-testid={`${dataTestId}.${key}`}
            {...form.getInputProps(key)}
          />
        );

      case "select":
        return (
          <Select
            searchable
            label={label}
            description={description}
            data={field.options}
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
      onSubmit={onSubmit && form.onSubmit(onSubmit)}
      data-testid={dataTestId}
    >
      <Stack gap="xs">{fields.map(renderInput)}</Stack>
    </form>
  );
};
