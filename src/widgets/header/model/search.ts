import type { SearchFormValues } from "./searchForm";

export interface SearchOptions {
  text: SearchFormValues["searchText"];
  field: SearchFormValues["field"];
  caseSensitive: SearchFormValues["caseSensitive"];
}
