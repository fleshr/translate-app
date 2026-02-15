import type { z } from "zod";
import type {
  BaseFieldSchema,
  FormFieldSchema,
  NumberFieldSchema,
  TextareaFieldSchema,
  TextFieldSchema,
} from "./schemas";

export type BaseField = z.infer<typeof BaseFieldSchema>;
export type TextField = z.infer<typeof TextFieldSchema>;
export type NumberField = z.infer<typeof NumberFieldSchema>;
export type TextareaField = z.infer<typeof TextareaFieldSchema>;
export type FormField = z.infer<typeof FormFieldSchema>;
