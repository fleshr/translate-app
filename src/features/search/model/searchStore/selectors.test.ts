import { describe, expect, it } from "vitest";
import { getSearchStoreStateMock } from "../../mocks";
import {
  selectCaseSensitive,
  selectFormValues,
  selectIsSelected,
  selectReplaceSelected,
  selectReplaceText,
  selectSearchField,
  selectSearchText,
  selectSearchValues,
} from "./selectors";

const testStore = getSearchStoreStateMock();

describe("features/search/model/searchStore/selectors", () => {
  describe("selectFormValues", () => {
    it("should return form values", () => {
      const result = selectFormValues(testStore);

      expect(result).toEqual({
        searchText: testStore.searchText,
        searchField: testStore.searchField,
        caseSensitive: testStore.caseSensitive,
        replaceText: testStore.replaceText,
      });
    });
  });

  describe("selectSearchValues", () => {
    it("should return search values", () => {
      const result = selectSearchValues(testStore);

      expect(result).toEqual({
        searchText: testStore.searchText,
        searchField: testStore.searchField,
        caseSensitive: testStore.caseSensitive,
      });
    });
  });

  describe("selectSearchText", () => {
    it("should return search text", () => {
      const result = selectSearchText(testStore);
      expect(result).toEqual(testStore.searchText);
    });
  });

  describe("selectSearchField", () => {
    it("should return search field", () => {
      const result = selectSearchField(testStore);
      expect(result).toEqual(testStore.searchField);
    });
  });

  describe("selectCaseSensitive", () => {
    it("should return case sensitive", () => {
      const result = selectCaseSensitive(testStore);
      expect(result).toEqual(testStore.caseSensitive);
    });
  });

  describe("selectReplaceText", () => {
    it("should return replace text", () => {
      const result = selectReplaceText(testStore);
      expect(result).toEqual(testStore.replaceText);
    });
  });

  describe("selectReplaceSelected", () => {
    it("should return replace selected", () => {
      const result = selectReplaceSelected(testStore);
      expect(result).toEqual([...testStore.replaceSelected]);
    });
  });

  describe("selectIsSelected", () => {
    it("should return true when is selected", () => {
      const result = selectIsSelected("segment-1")(testStore);
      expect(result).toBeTruthy();
    });

    it("should return false when is not selected", () => {
      const result = selectIsSelected("segment-6")(testStore);
      expect(result).toBeFalsy();
    });
  });
});
