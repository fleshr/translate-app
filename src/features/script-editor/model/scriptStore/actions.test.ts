import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import { setUserScriptCode } from "./actions";
import { useUserScriptStore } from "./store";

const testCode = "console.log('Test')";

describe("features/script-editor/model/scriptStore/actions", () => {
  afterEach(() => {
    resetStore(useUserScriptStore);
  });

  describe("setUserScriptCode", () => {
    it("should set code", () => {
      setUserScriptCode(testCode);
      expect(useUserScriptStore.getState().code).toBe(testCode);
    });
  });
});
