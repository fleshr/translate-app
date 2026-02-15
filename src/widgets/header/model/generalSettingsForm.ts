import { z } from "zod";

export const GeneralSettingsFormSchema = z.object({
  language: z.literal(["en", "ru"]),
  theme: z.literal(["light", "dark", "auto"]),
});

export type GeneralSettingsFormValues = z.infer<
  typeof GeneralSettingsFormSchema
>;
