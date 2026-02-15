import { z } from "zod";

export const BaseFieldSchema = z.object({
  key: z.string(),
  label: z.string(),
});

export const TextFieldSchema = BaseFieldSchema.extend({
  type: z.literal("text"),
  initial: z.string().optional(),
});

export const NumberFieldSchema = BaseFieldSchema.extend({
  type: z.literal("number"),
  initial: z.number().optional(),
});

export const TextareaFieldSchema = BaseFieldSchema.extend({
  type: z.literal("textarea"),
  initial: z.string().optional(),
});

export const FormFieldSchema = z.discriminatedUnion("type", [
  TextFieldSchema,
  NumberFieldSchema,
  TextareaFieldSchema,
]);
