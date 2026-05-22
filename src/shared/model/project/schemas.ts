import { z } from "zod";
import { ModuleSchema } from "../module";
import { TranslationResourceSchema } from "../translation";

export const ProjectBaseSchema = z.object({
  parser: z.union([ModuleSchema, z.string()]),
});

export const ProjectSchema = ProjectBaseSchema.extend({
  resources: TranslationResourceSchema.array(),
});
