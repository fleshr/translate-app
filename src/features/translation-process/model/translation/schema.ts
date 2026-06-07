import { z } from "zod";

export const TranslationProcessStatusSchema = z.literal([
  "idle",
  "translating",
]);

export const TranslationProcessModeSchema = z.literal(["sequential", "batch"]);
