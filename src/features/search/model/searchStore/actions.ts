import type { Id } from "@/shared/model/common";
import type { SearchFormValues } from "../searchForm";
import { useSearchStore } from "./store";

export const setFormValues = (formValues: Partial<SearchFormValues>) => {
  useSearchStore.setState(formValues, undefined, "setSearchField");
};

export const setReplaceSelected = (replaceSelected: Id[]) => {
  useSearchStore.setState({ replaceSelected }, undefined, "setReplaceSelected");
};

export const toggleReplaceSelected = (segmentId: Id) => {
  useSearchStore.setState(
    (state) => {
      if (state.replaceSelected.includes(segmentId)) {
        state.replaceSelected = state.replaceSelected.filter(
          (id) => id !== segmentId,
        );
      } else {
        state.replaceSelected.push(segmentId);
      }
    },
    undefined,
    "toggleReplaceSelected",
  );
};
