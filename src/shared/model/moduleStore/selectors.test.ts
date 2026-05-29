import { getModuleExternalMock } from "@/shared/mocks/module";
import { describe, expect, it } from "vitest";
import { selectModule, selectModules } from "./selectors";
import { type State } from "./store";

const testStore: State = {
  parsers: { "test@1.0.0": getModuleExternalMock() },
};

describe("shared/model/moduleStore/selectors", () => {
  describe("selectModule", () => {
    it("should return module", () => {
      const module = selectModule("parsers", "test@1.0.0")(testStore);

      expect(module).toEqual(testStore.parsers["test@1.0.0"]);
    });

    it("should return undefined if module not found", () => {
      const module = selectModule("parsers", "test@2.0.0")(testStore);

      expect(module).toBeUndefined();
    });
  });

  describe("selectModules", () => {
    it("should return modules list", () => {
      const modules = selectModules("parsers")(testStore);

      expect(modules).toEqual(Object.values(testStore.parsers));
    });
  });
});
