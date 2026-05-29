import { resetStore } from "@/shared/lib/testing";
import { getTranslationFileMock } from "@/shared/mocks/translation";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  addSessionTranslatingResourceProgress,
  initSession,
  setSessionResourcesProgress,
  setSessionSelectedResource,
  setSessionSelectedSegment,
  setSessionStatus,
  setSessionTranslatingResource,
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

  describe("setSessionStatus", () => {
    it("should set session status", () => {
      setSessionStatus("translating");

      expect(useSessionStore.getState().status).toEqual("translating");
    });
  });

  describe("setSessionResourcesProgress", () => {
    it("should set resources progress", () => {
      setSessionResourcesProgress({ test: { done: 50, total: 100 } });

      expect(useSessionStore.getState().resourcesProgress).toEqual({
        test: { done: 50, total: 100 },
      });
    });
  });

  describe("setSessionTranslatingResource", () => {
    it("should set selected segment", () => {
      setSessionTranslatingResource("test");

      expect(useSessionStore.getState().translatingResource).toEqual("test");
    });
  });

  describe("addSessionTranslatingResourceProgress", () => {
    beforeEach(() => {
      useSessionStore.setState({
        resourcesProgress: { test: { done: 50, total: 100 } },
      });
    });

    it("should do nothing if no translating resource", () => {
      useSessionStore.setState({ translatingResource: null });

      addSessionTranslatingResourceProgress();

      expect(useSessionStore.getState().resourcesProgress).toEqual({
        test: { done: 50, total: 100 },
      });
    });

    it("should increase progress by 1 by default", () => {
      useSessionStore.setState({ translatingResource: "test" });

      addSessionTranslatingResourceProgress();

      expect(useSessionStore.getState().resourcesProgress).toEqual({
        test: { done: 51, total: 100 },
      });
    });

    it("should increase progress by count", () => {
      useSessionStore.setState({ translatingResource: "test" });

      addSessionTranslatingResourceProgress(5);

      expect(useSessionStore.getState().resourcesProgress).toEqual({
        test: { done: 55, total: 100 },
      });
    });
  });

  describe("initSession", () => {
    it("should initialize session", () => {
      const testResource = getTranslationFileMock();

      initSession([testResource]);

      expect(useSessionStore.getState()).toEqual(
        expect.objectContaining({
          selectedResource: testResource.id,
          resourcesProgress: { [testResource.id]: { done: 0, total: 0 } },
        }),
      );
    });

    it("should do nothing if no resources", () => {
      initSession([]);

      expect(useSessionStore.getState()).toEqual(defaultState);
    });
  });
});
