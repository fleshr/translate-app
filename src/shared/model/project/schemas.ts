import { z } from "zod";
import { TranslationResourceSchema } from "../translation";

export const ProjectBaseSchema = z.object({
  parser: z.string(),
});

export const ProjectSchema = ProjectBaseSchema.extend({
  resources: TranslationResourceSchema.array(),
});

