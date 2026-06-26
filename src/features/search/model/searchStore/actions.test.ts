import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import {
  setFormValues,
  setReplaceSelected,
  toggleReplaceSelected,
} from "./actions";
import { useSearchStore } from "./store";

describe("features/search/model/searchStore/actions", () => {
  afterEach(() => {
    resetStore(useSearchStore);
  });

  describe("setFormValues", () => {
    it("should set form values", () => {
      setFormValues({
        searchText: "qwerty",
        searchField: "machineTranslation",
        caseSensitive: true,
        replaceText: "xyz",
      });

      expect(useSearchStore.getState()).toEqual({
        searchText: "qwerty",
        searchField: "machineTranslation",
        caseSensitive: true,
        replaceText: "xyz",
        replaceSelected: [],
      });
    });
  });

  describe("setReplaceSelected", () => {
    it("should set replace selected", () => {
      setReplaceSelected(["segment-1"]);

      expect(useSearchStore.getState().replaceSelected).toEqual(["segment-1"]);
    });
  });

  describe("toggleReplaceSelected", () => {
    it("should toggle replace selected", () => {
      toggleReplaceSelected("segment-1");
      expect(useSearchStore.getState().replaceSelected).toEqual(["segment-1"]);

      toggleReplaceSelected("segment-1");
      expect(useSearchStore.getState().replaceSelected).toEqual([]);
    });
  });
});
