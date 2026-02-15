import { createFunctionSchema } from "@/shared/lib/schema";
import { MetadataShema, PositionShema } from "@/shared/model/common";
import { z } from "zod";

export const ExtractedBaseSegmentSchema = z.object({
  text: z.string(),
  position: PositionShema,
  metadata: MetadataShema.optional(),
});

export const ExtractedCommonSegmentSchema = ExtractedBaseSegmentSchema.extend({
  type: z.literal("common"),
  key: z.string(),
  path: z.string().optional(),
});

export const ExtractedFileSegmentSchema = ExtractedBaseSegmentSchema.extend({
  type: z.literal("file"),
});

export const ExtractedSegmentSchema = z.discriminatedUnion("key", [
  ExtractedCommonSegmentSchema,
  ExtractedFileSegmentSchema,
]);

export const ExtractedDataSchema = z.object({
  content: z.string(),
  segments: ExtractedSegmentSchema.array(),
});

export const ReplacementSchema = z.object({
  original: z.string(),
  translation: z.string(),
  position: PositionShema,
  metadata: MetadataShema.optional(),
});

export const ParserShema = z.object({
  name: z.string(),
  version: z.string(),
  shortName: z.string(),

  checkFile: createFunctionSchema(
    z.function({
      input: [z.instanceof(File)],
      output: z.boolean(),
    }),
  ),

  extractText: createFunctionSchema(
    z.function({
      input: [z.instanceof(Uint8Array<ArrayBufferLike>)],
      output: ExtractedDataSchema,
    }),
  ),

  replaceText: createFunctionSchema(
    z.function({
      input: [z.string(), z.array(ReplacementSchema)],
      output: z.instanceof(Uint8Array<ArrayBufferLike>),
    }),
  ),
});
