import { getTranslationStoreStateMock } from "@/shared/mocks/translationStore";
import { describe, expect, it } from "vitest";
import {
  selectBaseResource,
  selectBaseResources,
  selectResource,
  selectResources,
  selectResourceSegments,
  selectSegment,
  selectSegments,
  selectUntranslatedSegments,
} from "./selectors";

const testStore = getTranslationStoreStateMock();

const file1 = testStore.resources.byId["file-1"]!;
const common1 = testStore.resources.byId["common-1"]!;

const segment1 = testStore.segments.byId["segment-1"]!;
const segment2 = testStore.segments.byId["segment-2"]!;
const segment3 = testStore.segments.byId["segment-3"]!;

describe("shared/model/translationStore/selectors", () => {
  describe("selectBaseResource", () => {
    it("should return base resource", () => {
      const resource = selectBaseResource("file-1")(testStore);
      expect(resource).toEqual({
        id: file1.id,
        name: file1.name,
        relPath: file1.relPath,
      });
    });
  });

  describe("selectBaseResources", () => {
    it("should return base resources", () => {
      const resources = selectBaseResources(testStore);
      expect(resources).toEqual([
        {
          id: common1.id,
          name: common1.name,
          relPath: common1.relPath,
        },
        {
          id: file1.id,
          name: file1.name,
          relPath: file1.relPath,
        },
      ]);
    });
  });

  describe("selectResource", () => {
    it("should return resource with segments", () => {
      const resource = selectResource("common-1")(testStore);
      expect(resource).toEqual({ ...common1, segments: [segment1] });
    });
  });

  describe("selectResources", () => {
    it("should return resources list with segments", () => {
      const resources = selectResources(testStore);
      expect(resources).toEqual([
        { ...common1, segments: [segment1] },
        { ...file1, segments: [segment2, segment3] },
      ]);
    });
  });

  describe("selectSegment", () => {
    it("should return segment", () => {
      const segment = selectSegment("segment-1")(testStore);
      expect(segment).toEqual(segment1);
    });
  });

  describe("selectSegments", () => {
    it("should return all segments", () => {
      const segments = selectSegments(testStore);
      expect(segments).toEqual([segment1, segment2, segment3]);
    });
  });

  describe("selectResourceSegments", () => {
    it("should return segments of resource", () => {
      const segments = selectResourceSegments("file-1")(testStore);
      expect(segments).toEqual([segment2, segment3]);
    });
  });

  describe("selectUntranslatedSegments", () => {
    it("should return all untranslated segments", () => {
      const segments = selectUntranslatedSegments(testStore);
      expect(segments).toEqual([segment3]);
    });
  });
});
