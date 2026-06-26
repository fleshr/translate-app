import type { Id } from "@/shared/model/common";
import { pick } from "remeda";
import type { SearchFormValues, SearchValues } from "../searchForm";
import type { State } from "./store";

export const selectFormValues = (state: State): SearchFormValues => {
  return pick(state, [
    "searchText",
    "searchField",
    "caseSensitive",
    "replaceText",
  ]);
};

export const selectSearchValues = (state: State): SearchValues => {
  return pick(state, ["searchText", "searchField", "caseSensitive"]);
};

export const selectSearchText = (state: State) => {
  return state.searchText;
};

export const selectSearchField = (state: State) => {
  return state.searchField;
};

export const selectCaseSensitive = (state: State) => {
  return state.caseSensitive;
};

export const selectReplaceText = (state: State) => {
  return state.replaceText;
};

export const selectReplaceSelected = (state: State): Id[] => {
  return state.replaceSelected;
};

export const selectIsSelected = (segmentId: Id) => {
  return (state: State): boolean => {
    return state.replaceSelected.includes(segmentId);
  };
};
