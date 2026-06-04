import type { z } from "zod";
import type {
  TranslationBaseResourceSchema,
  TranslationBaseSegmentSchema,
  TranslationCommonSchema,
  TranslationFileOccurrenceSchema,
  TranslationFileSchema,
  TranslationFlatSegmentSchema,
  TranslationResourceSchema,
  TranslationSegmentSchema,
} from "./schemas";

export type TranslationFileOccurrence = z.infer<
  typeof TranslationFileOccurrenceSchema
>;
export type TranslationBaseSegment = z.infer<
  typeof TranslationBaseSegmentSchema
>;
export type TranslationSegment = z.infer<typeof TranslationSegmentSchema>;
export type TranslationFlatSegment = z.infer<
  typeof TranslationFlatSegmentSchema
>;

export type TranslationBaseResource = z.infer<
  typeof TranslationBaseResourceSchema
>;
export type TranslationCommon = z.infer<typeof TranslationCommonSchema>;
export type TranslationFile = z.infer<typeof TranslationFileSchema>;
export type TranslationResource = z.infer<typeof TranslationResourceSchema>;
