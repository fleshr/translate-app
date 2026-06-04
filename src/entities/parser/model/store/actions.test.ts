import { resetStore } from "@/shared/lib/testing";
import { getModuleExternalMock } from "@/shared/mocks/module";
import { afterEach, describe, expect, it } from "vitest";
import { getParserStoreStateMock } from "../../mocks";
import { addParser, removeParser } from "./actions";
import { useParserStore } from "./store";

const testModule = getModuleExternalMock();

describe("entities/parser/model/store/actions", () => {
  afterEach(() => {
    resetStore(useParserStore);
  });

  describe("addParser", () => {
    it("should add parser to store", () => {
      useParserStore.setState({ parsers: {} });

      addParser(testModule);

      expect(useParserStore.getState()).toEqual({
        parsers: { "test@1.0.0": testModule },
      });
    });
  });

  describe("removeParser", () => {
    it("should remove parser from store", () => {
      const testStore = getParserStoreStateMock();
      const resultStore = { parsers: { ...testStore.parsers } };
      delete resultStore.parsers["test1@1.0.0"];

      useParserStore.setState(testStore);

      removeParser("test1@1.0.0");

      expect(useParserStore.getState()).toEqual(resultStore);
    });
  });
});
