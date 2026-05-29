import { resetStore } from "@/shared/lib/testing";
import { getModuleExternalMock } from "@/shared/mocks/module";
import { afterEach, describe, expect, it } from "vitest";
import { initProject } from "./actions";
import { useProjectStore } from "./store";

const testModule = getModuleExternalMock();

describe("shared/model/projectStore/actions", () => {
  afterEach(() => {
    resetStore(useProjectStore);
  });

  describe("initProject", () => {
    it("should initialize project with parser id", () => {
      useProjectStore.setState({ parser: "test" });

      initProject({ parser: "test@1.0.0" });

      expect(useProjectStore.getState()).toEqual({
        parser: "test@1.0.0",
      });
    });

    it("should initialize project with parser module", () => {
      useProjectStore.setState({ parser: "test" });

      initProject({ parser: testModule });

      expect(useProjectStore.getState()).toEqual({
        parser: testModule,
      });
    });
  });
});
