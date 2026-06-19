import type { z } from "zod";
import type {
  BaseFieldSchema,
  FormFieldSchema,
  NumberFieldSchema,
  SelectFieldSchema,
  SelectOptionSchema,
  TextareaFieldSchema,
  TextFieldSchema,
} from "./schemas";

export type BaseField = z.infer<typeof BaseFieldSchema>;
export type TextField = z.infer<typeof TextFieldSchema>;
export type NumberField = z.infer<typeof NumberFieldSchema>;
export type TextareaField = z.infer<typeof TextareaFieldSchema>;
export type SelectOption = z.infer<typeof SelectOptionSchema>;
export type SelectField = z.infer<typeof SelectFieldSchema>;
export type FormField = z.infer<typeof FormFieldSchema>;
