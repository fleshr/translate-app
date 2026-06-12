import { IdSchema } from "@/shared/model/common";
import { z } from "zod";
import { TranslationSegmentSchema } from "../segment/schema";

const TranslationBaseSchema = z.object({
  id: IdSchema,
  name: z.string(),
  relPath: z.string(),
});

export const TranslationBaseCommonSchema = TranslationBaseSchema.extend({
  type: z.literal("common"),
});

export const TranslationBaseFileSchema = TranslationBaseSchema.extend({
  type: z.literal("file"),
});

export const TranslationBaseResourceSchema = z.discriminatedUnion("type", [
  TranslationBaseCommonSchema,
  TranslationBaseFileSchema,
]);

export const TranslationCommonSchema = TranslationBaseCommonSchema.extend({
  segments: TranslationSegmentSchema.array(),
});

export const TranslationFileSchema = TranslationBaseFileSchema.extend({
  segments: TranslationSegmentSchema.array(),
});

export const TranslationResourceSchema = z.discriminatedUnion("type", [
  TranslationFileSchema,
  TranslationCommonSchema,
]);
