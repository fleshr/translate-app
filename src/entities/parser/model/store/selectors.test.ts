import { describe, expect, it } from "vitest";
import { getParserStoreStateMock } from "../../mocks";
import { selectParser, selectParsers } from "./selectors";

const testStore = getParserStoreStateMock();

describe("entities/parser/model/store/selectors", () => {
  describe("selectParser", () => {
    it("should return parser", () => {
      const parser = selectParser("test@1.0.0")(testStore);

      expect(parser).toEqual(testStore.parsers["test@1.0.0"]);
    });

    it("should return undefined if parser not found", () => {
      const parser = selectParser("test@2.0.0")(testStore);

      expect(parser).toBeUndefined();
    });
  });

  describe("selectParsers", () => {
    it("should return parsers list", () => {
      const parsers = selectParsers(testStore);

      expect(parsers).toEqual(Object.values(testStore.parsers));
    });
  });
});
