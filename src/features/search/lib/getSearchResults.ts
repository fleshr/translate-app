import type { TranslationResource } from "@/entities/translation";
import type { SearchValues } from "../model/searchForm";
import type { SearchResult } from "../model/searchResult";

export const getSearchResults = (
  resources: TranslationResource[],
  searchValues: SearchValues,
): SearchResult[] => {
  const { searchText, searchField } = searchValues;
  const resutls: SearchResult[] = [];

  if (!searchText) {
    return resutls;
  }

  for (const resource of resources) {
    resutls.push({
      label: resource.name,
      type: "header",
      resourceId: resource.id,
    });

    for (const segment of resource.segments) {
      if (segment[searchField].includes(searchText)) {
        resutls.push({
          label: segment[searchField],
          type: "select",
          resourceId: resource.id,
          segmentId: segment.id,
        });
      }
    }

    if (resutls.at(-1)?.type === "header") {
      resutls.pop();
    }
  }

  return resutls;
};
