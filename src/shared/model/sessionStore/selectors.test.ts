import { describe, expect, it } from "vitest";
import {
  selectIsSegmentSelected,
  selectIsTranslating,
  selectResourceProgress,
  selectResourcesProgress,
  selectSelectedResource,
  selectSelectedSegment,
  selectStatus,
  selectTotalProgress,
  selectTranslatingResource,
  selectTranslatingResourceProgress,
} from "./selectors";
import { type State } from "./store";

const testStore: State = {
  translatingResource: "testResource",
  resourcesProgress: { testResource: { done: 50, total: 100 } },
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

  describe("selectResourcesProgress", () => {
    it("should select resources progress", () => {
      const progress = selectResourcesProgress(testStore);
      expect(progress).toEqual({ testResource: { done: 50, total: 100 } });
    });
  });

  describe("selectTranslatingResource", () => {
    it("should select translating resource", () => {
      const resource = selectTranslatingResource(testStore);
      expect(resource).toEqual("testResource");
    });
  });

  describe("selectResourceProgress", () => {
    it("should select resource progress", () => {
      const progress = selectResourceProgress("testResource")(testStore);
      expect(progress).toEqual({ done: 50, total: 100 });
    });

    it("should return undefined if no translating resource", () => {
      const progress = selectResourceProgress("unknown")(testStore);
      expect(progress).toEqual(undefined);
    });
  });

  describe("selectTranslatingResourceProgress", () => {
    it("should select translating resource progress", () => {
      const progress = selectTranslatingResourceProgress(testStore);
      expect(progress).toEqual({ done: 50, total: 100 });
    });
  });

  describe("selectTotalProgress", () => {
    it("should select total progress", () => {
      const progress = selectTotalProgress(testStore);
      expect(progress).toEqual({ done: 0, total: 1 });
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
