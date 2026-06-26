import type { Id } from "@/shared/model/common";
import { isDeepEqual } from "remeda";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import type { SearchFormValues } from "../searchForm";

export interface State extends SearchFormValues {
  replaceSelected: Id[];
}

export const defaultState: State = {
  searchText: "",
  searchField: "originalText",
  caseSensitive: false,
  replaceText: "",
  replaceSelected: [],
};

export const useSearchStore = createWithEqualityFn<State>()(
  devtools(
    immer(() => defaultState),
    { name: "searchStore" },
  ),
  isDeepEqual,
);
