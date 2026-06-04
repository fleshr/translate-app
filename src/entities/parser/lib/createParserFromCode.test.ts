import { createModuleFromCode } from "@/shared/lib/module";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getParserMock } from "../mocks";
import { createParserFromCode } from "./createParserFromCode";

const mockParser = getParserMock();

vi.mock("@/shared/lib/module");

describe("entities/parser/lib/createParserFromCode", () => {
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
