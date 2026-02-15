import { z } from "zod";

export const CreateProjectFormSchema = z.object({
  parser: z.string(),
});

export type CreateProjectFormValues = z.infer<typeof CreateProjectFormSchema>;
