import type { Id } from "@/shared/model/common";

export interface SearchResultHeader {
  label: string;
  type: "header";
  resourceId: Id;
}

export interface SearchResultSelect {
  label: string;
  type: "select";
  resourceId: Id;
  segmentId: Id;
}

export type SearchResult = SearchResultHeader | SearchResultSelect;
