import { z } from "zod";
import type {
  TranslationProcessModeSchema,
  TranslationProcessStatusSchema,
} from "./schema";

export type TranslationProcessStatus = z.infer<
  typeof TranslationProcessStatusSchema
>;

export type TranslationProcessMode = z.infer<
  typeof TranslationProcessModeSchema
>;
