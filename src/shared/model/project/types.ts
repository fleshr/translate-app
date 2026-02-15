import type { z } from "zod";
import type { ProjectBaseSchema, ProjectSchema } from "./schemas";

export type ProjectBase = z.infer<typeof ProjectBaseSchema>;
export type Project = z.infer<typeof ProjectSchema>;
