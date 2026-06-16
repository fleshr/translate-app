import type { z } from "zod";
import type {
  TranslationFileOccurrenceSchema,
  TranslationFlatSegmentSchema,
  TranslationSegmentFieldsSchema,
  TranslationSegmentSchema,
} from "./schema";

export type TranslationSegmentFields = z.infer<
  typeof TranslationSegmentFieldsSchema
>;
export type TranslationFileOccurrence = z.infer<
  typeof TranslationFileOccurrenceSchema
>;
export type TranslationSegment = z.infer<typeof TranslationSegmentSchema>;
export type TranslationFlatSegment = z.infer<
  typeof TranslationFlatSegmentSchema
>;
