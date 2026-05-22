import { z } from "zod";

export const CreateProjectFormSchema = z.object({
  parser: z.string(),
  parserSaveFully: z.boolean(),
});

export type CreateProjectFormValues = z.infer<typeof CreateProjectFormSchema>;
