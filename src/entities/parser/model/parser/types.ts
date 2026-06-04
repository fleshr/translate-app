import { z } from "zod";
import {
  ExtractedBaseSegmentSchema,
  ExtractedCommonSegmentSchema,
  ExtractedDataSchema,
  ExtractedSegmentSchema,
  ParserShema,
  ReplacementSchema,
} from "./schemas";

export type ExtractedBaseSegment = z.infer<typeof ExtractedBaseSegmentSchema>;
export type ExtractedCommonSegment = z.infer<
  typeof ExtractedCommonSegmentSchema
>;
export type ExtractedSegment = z.infer<typeof ExtractedSegmentSchema>;
export type ExtractedData = z.infer<typeof ExtractedDataSchema>;
export type Replacement = z.infer<typeof ReplacementSchema>;
export type Parser = z.infer<typeof ParserShema>;
