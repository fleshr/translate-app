import { describe, expect, it } from "vitest";
import {
  selectSelectedTranslator,
  selectTranslatorConfig,
  selectViewShowBottomPanel,
  selectViewShowSidePanel,
} from "./selectors";
import type { State } from "./store";

const testStore: State = {
  translator: {
    selected: "test",
    configs: { test: { testField1: "testValue1" } },
  },
  view: {
    showBottomPanel: false,
    showSidePanel: false,
  },
};

describe("shared/model/settingsStore/selectors", () => {
  describe("selectSelectedTranslator", () => {
    it("should return selected translator", () => {
      const selected = selectSelectedTranslator(testStore);
      expect(selected).toEqual("test");
    });
  });

  describe("selectTranslatorConfig", () => {
    it("should return selected translator", () => {
      const config = selectTranslatorConfig("test")(testStore);
      expect(config).toEqual({ testField1: "testValue1" });
    });

    it("should return undefined if no config", () => {
      const config = selectTranslatorConfig("unknown")(testStore);
      expect(config).toBeUndefined();
    });
  });

  describe("selectViewShowBottomPanel", () => {
    it("should return show bottom panel", () => {
      const show = selectViewShowBottomPanel(testStore);
      expect(show).toBeFalsy();
    });
  });

  describe("selectViewShowSidePanel", () => {
    it("should return show side panel", () => {
      const show = selectViewShowSidePanel(testStore);
      expect(show).toBeFalsy();
    });
  });
});
