import { getSettingsStoreStateMock } from "@/shared/mocks/settingsStore";
import { describe, expect, it } from "vitest";
import {
  selectViewShowBottomPanel,
  selectViewShowSidePanel,
} from "./selectors";

const testStore = getSettingsStoreStateMock();

describe("shared/model/settingsStore/selectors", () => {
  describe("selectViewShowBottomPanel", () => {
    it("should return show bottom panel", () => {
      const show = selectViewShowBottomPanel(testStore);
      expect(show).toBeTruthy();
    });
  });

  describe("selectViewShowSidePanel", () => {
    it("should return show side panel", () => {
      const show = selectViewShowSidePanel(testStore);
      expect(show).toBeTruthy();
    });
  });
});
