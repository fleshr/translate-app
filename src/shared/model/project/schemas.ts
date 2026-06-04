import { z } from "zod";
import { ModuleExternalSchema } from "../module";

export const ProjectSchema = z.object({
  parser: z.union([ModuleExternalSchema, z.string()]),
});
