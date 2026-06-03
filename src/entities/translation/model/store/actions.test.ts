import { resetStore } from "@/shared/lib/testing";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getTranslationStoreStateMock } from "../../mocks";
import {
  initTranslation,
  replaceTranslationSegmentsField,
  setTranslationSegmentField,
  setTranslationSegments,
  setTranslationSegmentsField,
} from "./actions";
import { useTranslationStore } from "./store";

const testStore = getTranslationStoreStateMock();

const file1 = testStore.resources.byId["file-1"]!;
const common1 = testStore.resources.byId["common-1"]!;

const segment1 = testStore.segments.byId["segment-1"]!;
const segment2 = testStore.segments.byId["segment-2"]!;
const segment3 = testStore.segments.byId["segment-3"]!;

describe("shared/model/translationStore/actions", () => {
  beforeEach(() => {
    useTranslationStore.setState(testStore);
  });

  afterEach(() => {
    resetStore(useTranslationStore);
  });

  describe("initTranslation", () => {
    it("should init translation store with resources", () => {
      resetStore(useTranslationStore);

      initTranslation([
        { ...common1, segments: [segment1] },
        { ...file1, segments: [segment2, segment3] },
      ]);

      expect(useTranslationStore.getState()).toEqual(testStore);
    });
  });

  describe("setTranslationSegmentField", () => {
    it("should set machineTranslation field by default", () => {
      setTranslationSegmentField(segment1.id, "test");

      expect(useTranslationStore.getState().segments.byId).toEqual({
        [segment1.id]: expect.objectContaining({ machineTranslation: "test" }),
        [segment2.id]: segment2,
        [segment3.id]: segment3,
      });
    });

    it("should set different field", () => {
      setTranslationSegmentField(segment1.id, "test", "manualTranslation");

      expect(useTranslationStore.getState().segments.byId).toEqual({
        [segment1.id]: expect.objectContaining({ manualTranslation: "test" }),
        [segment2.id]: segment2,
        [segment3.id]: segment3,
      });
    });
  });

  describe("setTranslationSegmentsField", () => {
    it("should set machineTranslation field by default for each segment", () => {
      setTranslationSegmentsField([
        { id: segment1.id, translation: "test1" },
        { id: segment2.id, translation: "test2" },
      ]);

      expect(useTranslationStore.getState().segments.byId).toEqual({
        [segment1.id]: expect.objectContaining({ machineTranslation: "test1" }),
        [segment2.id]: expect.objectContaining({ machineTranslation: "test2" }),
        [segment3.id]: segment3,
      });
    });

    it("should set different field for each segment", () => {
      setTranslationSegmentsField(
        [
          { id: segment1.id, translation: "test1" },
          { id: segment2.id, translation: "test2" },
        ],
        "manualTranslation",
      );

      expect(useTranslationStore.getState().segments.byId).toEqual({
        [segment1.id]: expect.objectContaining({ manualTranslation: "test1" }),
        [segment2.id]: expect.objectContaining({ manualTranslation: "test2" }),
        [segment3.id]: segment3,
      });
    });
  });

  describe("setTranslationSegments", () => {
    it("should replace segments", () => {
      const newSegment1 = {
        ...segment1,
        machineTranslation: "1",
        manualTranslation: "1",
        originalText: "1",
      };

      const newSegment2 = {
        ...segment2,
        machineTranslation: "2",
        manualTranslation: "2",
        originalText: "2",
      };

      setTranslationSegments([newSegment1, newSegment2]);

      expect(useTranslationStore.getState().segments.byId).toEqual({
        [newSegment1.id]: newSegment1,
        [newSegment2.id]: newSegment2,
        [segment3.id]: segment3,
      });
    });

    it("should do nothing if new segment id not exists in store", () => {
      const newSegment = {
        ...segment1,
        id: "segment-999",
        machineTranslation: "1",
        manualTranslation: "1",
        originalText: "1",
      };

      setTranslationSegments([newSegment]);

      expect(useTranslationStore.getState()).toEqual(testStore);
    });
  });

  describe("replaceTranslationSegmentsField", () => {
    it("should replace segments text in machineTranslation by default", () => {
      replaceTranslationSegmentsField(
        [segment1.id, segment2.id],
        "ine translation",
        "1",
      );

      expect(useTranslationStore.getState().segments.byId).toEqual({
        [segment1.id]: expect.objectContaining({ machineTranslation: "Mach1" }),
        [segment2.id]: expect.objectContaining({ machineTranslation: "Mach1" }),
        [segment3.id]: segment3,
      });
    });

    it("should replace segments text in different field", () => {
      replaceTranslationSegmentsField(
        [segment1.id, segment2.id],
        "ual translation",
        "1",
        "manualTranslation",
      );

      expect(useTranslationStore.getState().segments.byId).toEqual({
        [segment1.id]: expect.objectContaining({ manualTranslation: "Man1" }),
        [segment2.id]: expect.objectContaining({ manualTranslation: "Man1" }),
        [segment3.id]: segment3,
      });
    });
  });
});
