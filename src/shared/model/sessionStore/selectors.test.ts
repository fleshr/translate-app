import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { describe, expect, it } from "vitest";
import { selectSelectedResource, selectSelectedSegment } from "./selectors";

const testStore = getSessionStoreStateMock({
  selectedResource: "testResource",
  selectedSegment: "testSegment",
});

describe("shared/model/sessionStore/selectors", () => {
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
});
