import type { z } from "zod";
import type {
  TranslationBaseCommonSchema,
  TranslationBaseFileSchema,
  TranslationBaseResourceSchema,
  TranslationCommonSchema,
  TranslationFileSchema,
  TranslationResourceSchema,
} from "./schema";

export type TranslationBaseCommon = z.infer<typeof TranslationBaseCommonSchema>;
export type TranslationBaseFile = z.infer<typeof TranslationBaseFileSchema>;
export type TranslationBaseResource = z.infer<
  typeof TranslationBaseResourceSchema
>;

export type TranslationCommon = z.infer<typeof TranslationCommonSchema>;
export type TranslationFile = z.infer<typeof TranslationFileSchema>;
export type TranslationResource = z.infer<typeof TranslationResourceSchema>;
