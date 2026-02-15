import { z } from "zod";

export const IdSchema = z.string();

export const PositionShema = z.object({
  start: z.number(),
  end: z.number(),
});

export const MetadataShema = z.record(z.string(), z.unknown());

export const ProgressSchema = z.object({
  done: z.number(),
  total: z.number(),
});
