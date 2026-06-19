import { z } from "zod";

export const BaseFieldSchema = z.object({
  key: z.string(),
  label: z.string(),
  description: z.string().optional(),
});

export const TextFieldSchema = BaseFieldSchema.extend({
  type: z.literal("text"),
});

export const NumberFieldSchema = BaseFieldSchema.extend({
  type: z.literal("number"),
});

export const TextareaFieldSchema = BaseFieldSchema.extend({
  type: z.literal("textarea"),
});

export const SelectOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const SelectFieldSchema = BaseFieldSchema.extend({
  type: z.literal("select"),
  options: SelectOptionSchema.array(),
});

export const FormFieldSchema = z.discriminatedUnion("type", [
  TextFieldSchema,
  NumberFieldSchema,
  TextareaFieldSchema,
  SelectFieldSchema,
]);
