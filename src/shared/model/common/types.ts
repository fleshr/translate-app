import type { z } from "zod";
import type {
  IdSchema,
  MetadataShema,
  PositionShema,
  ProgressSchema,
} from "./schemas";

export type Id = z.infer<typeof IdSchema>;
export type Position = z.infer<typeof PositionShema>;
export type Metadata = z.infer<typeof MetadataShema>;
export type Progress = z.infer<typeof ProgressSchema>;
