import { resetStore } from "@/shared/lib/testing";
import { getModuleExternalMock } from "@/shared/mocks/module";
import { afterEach, describe, expect, it } from "vitest";
import { addModule, removeModule } from "./actions";
import { useModuleStore } from "./store";

const testModule = getModuleExternalMock();

describe("shared/model/moduleStore/actions", () => {
  afterEach(() => {
    resetStore(useModuleStore);
  });

  describe("addModule", () => {
    it("should add module to store", () => {
      useModuleStore.setState({ parsers: {} });

      addModule("parsers", testModule);

      expect(useModuleStore.getState().parsers).toEqual({
        "test@1.0.0": testModule,
      });
    });
  });

  describe("removeModule", () => {
    it("should remove module from store", () => {
      useModuleStore.setState({
        parsers: { "test@1.0.0": testModule },
      });

      removeModule("parsers", "test@1.0.0");

      expect(useModuleStore.getState().parsers).toEqual({});
    });
  });
});
