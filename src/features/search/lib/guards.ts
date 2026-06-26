import type { SearchResult, SearchResultSelect } from "../model/searchResult";

export const isSearchResultSelect = (
  result: SearchResult,
): result is SearchResultSelect => {
  return result.type === "select";
};

export const isSearchResultHeader = (
  result: SearchResult,
): result is SearchResultSelect => {
  return result.type === "header";
};
