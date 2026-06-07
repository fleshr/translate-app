import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import {
  setTranslationProcessStatus,
  setTranslationProcessTranslatingResource,
} from "./actions";
import { useTranslationProcessStore } from "./store";

describe("features/translation-process/model/processStore/actions", () => {
  afterEach(() => {
    resetStore(useTranslationProcessStore);
  });

  describe("setTranslationProcessStatus", () => {
    it("should set translation process status", () => {
      setTranslationProcessStatus("translating");
      expect(useTranslationProcessStore.getState().status).toBe("translating");

      setTranslationProcessStatus("idle");
      expect(useTranslationProcessStore.getState().status).toBe("idle");
    });
  });

  describe("setTranslationProcessTranslatingResource", () => {
    it("should set translating resource", () => {
      setTranslationProcessTranslatingResource("test-1");
      expect(useTranslationProcessStore.getState().translatingResource).toBe(
        "test-1",
      );

      setTranslationProcessTranslatingResource("file-123");
      expect(useTranslationProcessStore.getState().translatingResource).toBe(
        "file-123",
      );
    });
  });
});
