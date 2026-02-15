import { z } from "zod";
import { IdSchema, MetadataShema, PositionShema } from "../common";

export const TranslationBaseSegmentSchema = z.object({
  id: IdSchema,
  resourceId: IdSchema,
  originalText: z.string(),
  machineTranslation: z.string(),
  manualTranslation: z.string(),
});

export const TranslationFileOccurrenceSchema = z.object({
  position: PositionShema,
  metadata: MetadataShema,
});

export const TranslationSegmentSchema = TranslationBaseSegmentSchema.extend({
  fileOccurrences: z.record(IdSchema, TranslationFileOccurrenceSchema.array()),
});

export const TranslationFlatSegmentSchema = TranslationBaseSegmentSchema.extend(
  TranslationFileOccurrenceSchema.shape,
);

export const TranslationBaseResourceSchema = z.object({
  id: IdSchema,
  name: z.string(),
  relPath: z.string(),
});

export const TranslationCommonSchema = TranslationBaseResourceSchema.extend({
  type: z.literal("common"),
  segments: TranslationSegmentSchema.array(),
});

export const TranslationFileSchema = TranslationBaseResourceSchema.extend({
  type: z.literal("file"),
  content: z.string(),
  segments: TranslationSegmentSchema.array(),
});

export const TranslationResourceSchema = z.discriminatedUnion("type", [
  TranslationFileSchema,
  TranslationCommonSchema,
]);
