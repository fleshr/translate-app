import type { z } from "zod";
import type { ProjectSchema } from "./schema";

export type Project = z.infer<typeof ProjectSchema>;
