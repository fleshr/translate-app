import { TranslationSegmentFieldsSchema } from "@/entities/translation";
import { z } from "zod";

export const SearchFormSchema = z.object({
  searchText: z.string().min(1),
  replaceText: z.string(),
  field: z.keyof(TranslationSegmentFieldsSchema),
  replace: z.boolean(),
  caseSensitive: z.boolean(),
});

export type SearchFormValues = z.infer<typeof SearchFormSchema>;
