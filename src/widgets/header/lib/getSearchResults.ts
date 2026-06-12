import type { TranslationResource } from "@/entities/translation";
import { filter, isEmpty, map, pipe } from "remeda";
import type { SearchOptions } from "../model/search";

export const getSearchResults = (
  resources: TranslationResource[],
  options: SearchOptions,
): TranslationResource[] => {
  const { text, field } = options;

  if (!text) {
    return [];
  }

  return pipe(
    resources,
    map((resource) => ({
      ...resource,
      segments: filter(resource.segments, (segment) => {
        return segment[field].includes(text);
      }),
    })),
    filter(({ segments }) => !isEmpty(segments)),
  );
};
