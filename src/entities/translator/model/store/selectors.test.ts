import { describe, expect, it } from "vitest";
import { getTranslatorStoreStateMock } from "../../mocks/store";
import { selectSelectedTranslator, selectTranslatorConfig } from "./selectors";

const testStore = getTranslatorStoreStateMock();

describe("entities/translator/model/store/selectors", () => {
  describe("selectSelectedTranslator", () => {
    it("should return selected translator", () => {
      const selected = selectSelectedTranslator(testStore);
      expect(selected).toEqual(testStore.selected);
    });
  });

  describe("selectTranslatorConfig", () => {
    it("should return selected translator", () => {
      const config = selectTranslatorConfig(testStore.selected)(testStore);
      expect(config).toEqual(testStore.configs[testStore.selected]);
    });

    it("should return undefined if no config", () => {
      const config = selectTranslatorConfig("unknown")(testStore);
      expect(config).toBeUndefined();
    });
  });
});
