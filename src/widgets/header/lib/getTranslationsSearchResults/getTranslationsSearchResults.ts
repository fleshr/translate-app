import type { TranslationResource } from "@/entities/translation";
import type { SearchOptions } from "../../model/search";

export const getTranslationsSearchResults = (
  resources: TranslationResource[],
  options: SearchOptions,
): TranslationResource[] => {
  const { text, field } = options;

  if (!text) {
    return [];
  }

  return resources
    .map((resource) => ({
      ...resource,
      segments: resource.segments.filter((segment) =>
        segment[field].includes(text),
      ),
    }))
    .filter((resource) => resource.segments.length);
};
