import { TranslationSegmentFieldsSchema } from "@/entities/translation";
import { z } from "zod";

export const SearchValueSchema = z.object({
  searchText: z.string(),
  searchField: z.keyof(TranslationSegmentFieldsSchema),
  caseSensitive: z.boolean(),
});

export const SearchFormSchema = SearchValueSchema.extend({
  replaceText: z.string(),
});

export type SearchValues = z.infer<typeof SearchValueSchema>;
export type SearchFormValues = z.infer<typeof SearchFormSchema>;
