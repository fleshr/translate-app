import { TranslationResourceSchema } from "@/entities/translation";
import { ProjectSchema } from "@/shared/model/project";
import { z } from "zod";

export const ProjectFileSchema = z.object({
  project: ProjectSchema,
  resources: TranslationResourceSchema.array(),
});
