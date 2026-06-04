import { describe, expect, it } from "vitest";
import {
  selectIsSegmentSelected,
  selectIsTranslating,
  selectSelectedResource,
  selectSelectedSegment,
  selectStatus,
  selectTranslatingResource,
} from "./selectors";
import { type State } from "./store";

const testStore: State = {
  translatingResource: "testResource",
  selectedResource: "testResource",
  selectedSegment: "testSegment",
  status: "translating",
};

describe("shared/model/sessionStore/selectors", () => {
  describe("selectStatus", () => {
    it("should select status", () => {
      const status = selectStatus(testStore);
      expect(status).toEqual("translating");
    });
  });

  describe("selectSelectedResource", () => {
    it("should select selected resource", () => {
      const resource = selectSelectedResource(testStore);
      expect(resource).toEqual("testResource");
    });
  });

  describe("selectSelectedSegment", () => {
    it("should select selected segment", () => {
      const segment = selectSelectedSegment(testStore);
      expect(segment).toEqual("testSegment");
    });
  });

  describe("selectTranslatingResource", () => {
    it("should select translating resource", () => {
      const resource = selectTranslatingResource(testStore);
      expect(resource).toEqual("testResource");
    });
  });

  describe("selectIsSegmentSelected", () => {
    it("should return true if segment is selected", () => {
      const selected = selectIsSegmentSelected("testSegment")(testStore);
      expect(selected).toBeTruthy();
    });

    it("should return false if segment is not selected", () => {
      const selected = selectIsSegmentSelected("unknown")(testStore);
      expect(selected).toBeFalsy();
    });
  });

  describe("selectIsTranslating", () => {
    it("should return true if status translating", () => {
      const isTranslating = selectIsTranslating(testStore);
      expect(isTranslating).toBeTruthy();
    });

    it("should return false if status not translating", () => {
      const isTranslating = selectIsTranslating({
        ...testStore,
        status: "idle",
      });
      expect(isTranslating).toBeFalsy();
    });
  });
});
