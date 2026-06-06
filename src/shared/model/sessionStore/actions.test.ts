import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import {
  initSession,
  setSessionSelectedResource,
  setSessionSelectedSegment,
} from "./actions";
import { defaultState, useSessionStore } from "./store";

describe("shared/model/sessionStore/actions", () => {
  afterEach(() => {
    resetStore(useSessionStore);
  });

  describe("setSessionSelectedResource", () => {
    it("should set selected resource", () => {
      setSessionSelectedResource("test");

      expect(useSessionStore.getState().selectedResource).toEqual("test");
    });
  });

  describe("setSessionSelectedSegment", () => {
    it("should set selected segment", () => {
      setSessionSelectedSegment("test");

      expect(useSessionStore.getState().selectedSegment).toEqual("test");
    });
  });

  describe("initSession", () => {
    it("should initialize session with selected resource", () => {
      initSession("file-1");

      expect(useSessionStore.getState()).toEqual(
        expect.objectContaining({ selectedResource: "file-1" }),
      );
    });

    it("should initialize session without selected resource", () => {
      initSession(null);

      expect(useSessionStore.getState()).toEqual(defaultState);
    });
  });
});
