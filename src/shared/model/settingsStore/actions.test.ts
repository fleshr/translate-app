import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import {
  setSettingsSelectedTranslator,
  setSettingsTranslatorConfig,
  toggleSettingsBottomPanel,
  toggleSettingsSidePanel,
} from "./actions";
import { useSettingsStore } from "./store";

describe("shared/model/settingsStore/actions", () => {
  afterEach(() => {
    resetStore(useSettingsStore);
  });

  describe("setSettingsTranslatorConfig", () => {
    it("should set translator config", () => {
      setSettingsTranslatorConfig("test", { testField1: "testValue1" });

      expect(useSettingsStore.getState().translator.configs).toEqual({
        test: { testField1: "testValue1" },
      });
    });
  });

  describe("setSettingsSelectedTranslator", () => {
    it("should set selected translator", () => {
      setSettingsSelectedTranslator("test");

      expect(useSettingsStore.getState().translator.selected).toEqual("test");
    });
  });

  describe("toggleSettingsBottomPanel", () => {
    it("should toggle bottom panel", () => {
      toggleSettingsBottomPanel();
      expect(useSettingsStore.getState().view.showBottomPanel).toBeFalsy();

      toggleSettingsBottomPanel();
      expect(useSettingsStore.getState().view.showBottomPanel).toBeTruthy();
    });
  });

  describe("toggleSettingsSidePanel", () => {
    it("should toggle side panel", () => {
      toggleSettingsSidePanel();
      expect(useSettingsStore.getState().view.showSidePanel).toBeFalsy();

      toggleSettingsSidePanel();
      expect(useSettingsStore.getState().view.showSidePanel).toBeTruthy();
    });
  });
});
