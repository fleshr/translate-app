import { createParserFromCode } from "@/shared/lib/module";
import { resetStore } from "@/shared/lib/testing";
import {
  getModuleBuiltinMock,
  getModuleExternalMock,
} from "@/shared/mocks/module";
import { useModuleStore } from "@/shared/model/moduleStore";
import type { Parser } from "@/shared/model/parser";
import { useProjectStore } from "@/shared/model/projectStore";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveParser } from "./resolveParser";

const testParser1 = getModuleExternalMock({ id: "test1@1.0.0", code: "test1" });
const testParser2 = getModuleBuiltinMock({ id: "test2@1.0.0" });
const testParser3 = getModuleBuiltinMock({ id: "test3@1.0.0" });

vi.mock("@/shared/lib/module");
vi.mocked(createParserFromCode).mockResolvedValue({ name: "test" } as Parser);

vi.mock("@/shared/constants/parsers", () => ({
  builtinParsersMeta: {},
  builtinParsers: { "test2@1.0.0": { name: "test2" } as Parser },
}));

describe("shared/lib/parser/resolveParser", () => {
  beforeEach(() => {
    useModuleStore.setState({
      parsers: {
        "test1@1.0.0": testParser1,
        "test2@1.0.0": testParser2,
        "test3@1.0.0": testParser3,
      },
    });
    useProjectStore.setState({ parser: "" });
  });

  afterEach(() => {
    resetStore(useModuleStore, useProjectStore);
  });

  it("should return undefined if parser module not found", async () => {
    useProjectStore.setState({ parser: "unknown" });

    const parser = await resolveParser();

    expect(parser).toBeUndefined();
  });

  it("should return undefined if builtin parser not found", async () => {
    useProjectStore.setState({ parser: "test3@1.0.0" });

    const parser = await resolveParser();

    expect(parser).toBeUndefined();
  });

  it("should return parser from project with fully parser", async () => {
    const testParser = getModuleExternalMock();
    useProjectStore.setState({ parser: testParser });

    const parser = await resolveParser();

    expect(createParserFromCode).toHaveBeenCalledWith(testParser.code);
    expect(parser).toEqual({ name: "test" });
  });

  it("should return parser from module store", async () => {
    useProjectStore.setState({ parser: "test1@1.0.0" });

    const parser = await resolveParser();

    expect(createParserFromCode).toHaveBeenCalledWith(testParser1.code);
    expect(parser).toEqual({ name: "test" });
  });

  it("should return builtin parser", async () => {
    useProjectStore.setState({ parser: "test2@1.0.0" });

    const parser = await resolveParser();

    expect(parser).toEqual({ name: "test2" });
  });
});
