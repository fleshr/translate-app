import type { SearchResult } from "../model/searchResult";

export const getHeaderIndexes = (results: SearchResult[]) => {
  const indexes: number[] = [];

  for (let i = 0; i < results.length; i++) {
    if (results[i]?.type === "header") {
      indexes.push(i);
    }
  }

  return indexes;
};
