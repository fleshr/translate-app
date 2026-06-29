import { describe, expect, it } from "vitest";
import { getUserScriptStoreStateMock } from "../../mocks";
import { selectCode } from "./selectors";

const testStore = getUserScriptStoreStateMock();

describe("features/script-editor/model/scriptStore/selectors", () => {
  describe("selectCode", () => {
    it("should return code", () => {
      const code = selectCode(testStore);
      expect(code).toBe(testStore.code);
    });
  });
});
