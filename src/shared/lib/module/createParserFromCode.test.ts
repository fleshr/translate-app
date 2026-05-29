import { getParserMock } from "@/shared/mocks/parser";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createModuleFromCode } from "./createModuleFromCode";
import { createParserFromCode } from "./createParserFromCode";

const mockParser = getParserMock();

vi.mock("./createModuleFromCode");

describe("shared/lib/module/createParserFromCode", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "Blob",
      vi.fn(function () {
        return { type: "text/javascript", size: 0 };
      }),
    );

    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "testUrl"),
      revokeObjectURL: vi.fn(),
    });
  });

  it("should create a parser from code", async () => {
    vi.mocked(createModuleFromCode).mockResolvedValue({ default: mockParser });
    const parser = await createParserFromCode("testCode");

    expect(createModuleFromCode).toHaveBeenCalledWith("testCode");
    expect(parser).toEqual(mockParser);
  });

  it("should throw if parser module not parsed", async () => {
    vi.mocked(createModuleFromCode).mockResolvedValue({});
    await expect(createParserFromCode("testCode")).rejects.toThrow();
  });
});
