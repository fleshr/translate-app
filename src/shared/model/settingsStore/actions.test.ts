import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import { toggleSettingsBottomPanel, toggleSettingsSidePanel } from "./actions";
import { useSettingsStore } from "./store";

describe("shared/model/settingsStore/actions", () => {
  afterEach(() => {
    resetStore(useSettingsStore);
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
