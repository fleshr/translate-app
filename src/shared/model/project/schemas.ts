import { z } from "zod";
import { ModuleExternalSchema } from "../module";
import { TranslationResourceSchema } from "../translation";

export const ProjectBaseSchema = z.object({
  parser: z.union([ModuleExternalSchema, z.string()]),
});

export const ProjectSchema = ProjectBaseSchema.extend({
  resources: TranslationResourceSchema.array(),
});
