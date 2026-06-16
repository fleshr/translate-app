import { IdSchema, MetadataShema, PositionShema } from "@/shared/model/common";
import { z } from "zod";

export const TranslationSegmentFieldsSchema = z.object({
  originalText: z.string(),
  machineTranslation: z.string(),
  manualTranslation: z.string(),
});

export const TranslationFileOccurrenceSchema = z.object({
  position: PositionShema,
  metadata: MetadataShema,
});

export const TranslationSegmentSchema = TranslationSegmentFieldsSchema.extend({
  id: IdSchema,
  fileOccurrences: z.record(IdSchema, TranslationFileOccurrenceSchema.array()),
});

export const TranslationFlatSegmentSchema =
  TranslationSegmentFieldsSchema.extend(TranslationFileOccurrenceSchema.shape);
