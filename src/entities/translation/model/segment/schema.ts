import { IdSchema, MetadataShema, PositionShema } from "@/shared/model/common";
import { z } from "zod";

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
