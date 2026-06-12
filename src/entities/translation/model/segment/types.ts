import type { z } from "zod";
import type {
  TranslationBaseSegmentSchema,
  TranslationFileOccurrenceSchema,
  TranslationFlatSegmentSchema,
  TranslationSegmentSchema,
} from "./schema";

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
