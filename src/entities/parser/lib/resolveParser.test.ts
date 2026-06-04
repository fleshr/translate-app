import { resetStore } from "@/shared/lib/testing";
import { getModuleExternalMock } from "@/shared/mocks/module";
import type { ModuleExternal } from "@/shared/model/module";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getParserStoreStateMock } from "../mocks";
import type { Parser } from "../model/parser/types";
import { useParserStore } from "../model/store/store";
import { createParserFromCode } from "./createParserFromCode";
import { resolveParser } from "./resolveParser";

const testStore = getParserStoreStateMock();
const testParser1 = testStore.parsers["test1@1.0.0"] as ModuleExternal;

vi.mock("./createParserFromCode");
vi.mocked(createParserFromCode).mockResolvedValue({ name: "test" } as Parser);

vi.mock("../model/builtin", () => ({
  builtinParsersMeta: {},
  builtinParsers: { "test2@1.0.0": { name: "test2" } as Parser },
}));

describe("shared/lib/parser/resolveParser", () => {
  beforeEach(() => {
    useParserStore.setState(testStore);
  });

  afterEach(() => {
    resetStore(useParserStore);
  });

  it("should return undefined if parser module not found", async () => {
    const parser = await resolveParser("unknown");

    expect(parser).toBeUndefined();
  });

  it("should return undefined if builtin parser not found", async () => {
    const parser = await resolveParser("test3@1.0.0");

    expect(parser).toBeUndefined();
  });

  it("should return parser from project with fully parser", async () => {
    const testParser = getModuleExternalMock();
    const parser = await resolveParser(testParser);

    expect(createParserFromCode).toHaveBeenCalledWith(testParser.code);
    expect(parser).toEqual({ name: "test" });
  });

  it("should return parser from module store", async () => {
    const parser = await resolveParser("test1@1.0.0");

    expect(createParserFromCode).toHaveBeenCalledWith(testParser1.code);
    expect(parser).toEqual({ name: "test" });
  });

  it("should return builtin parser", async () => {
    const parser = await resolveParser("test2@1.0.0");

    expect(parser).toEqual({ name: "test2" });
  });
});
