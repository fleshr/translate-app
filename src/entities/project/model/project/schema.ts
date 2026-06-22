import { ModuleExternalSchema } from "@/shared/model/module";
import { z } from "zod";

export const ProjectSchema = z.object({
  parser: z.union([ModuleExternalSchema, z.string()]),
});
