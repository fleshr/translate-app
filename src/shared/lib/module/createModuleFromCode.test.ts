import { ModuleUnknownSchema } from "@/shared/model/module";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createModuleFromCode } from "./createModuleFromCode";

const testCode = 'export const test = "test"';
const base64Code = Buffer.from(testCode).toString("base64");

vi.mock("@/shared/model/module", { spy: true });

describe("shared/lib/module/createModuleFromCode", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "Blob",
      vi.fn(function () {
        return { type: "text/javascript", size: 0 };
      }),
    );

    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => `data:text/javascript;base64,${base64Code}`),
      revokeObjectURL: vi.fn(),
    });
  });

  it("should create a module from code", async () => {
    const module = await createModuleFromCode("testCode");

    expect(Blob).toHaveBeenCalledWith(["testCode"], {
      type: "text/javascript",
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith({
      type: "text/javascript",
      size: 0,
    });
    expect(module).toEqual({ test: "test" });
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(
      `data:text/javascript;base64,${base64Code}`,
    );
  });

  it("should throw error", async () => {
    vi.mocked(ModuleUnknownSchema.parse).mockRejectedValue(new Error("error"));
    const result = createModuleFromCode("");
    await expect(result).rejects.toThrow();
  });
});
