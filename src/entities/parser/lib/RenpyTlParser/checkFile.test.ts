import { describe, expect, it } from "vitest";
import { checkFile } from "./checkFile";

describe("entities/parser/lib/RenpyTlParser/checkFile", () => {
  it("should check file", () => {
    expect(checkFile(new File(["test"], "test.rpy"))).toBe(true);
    expect(checkFile(new File(["test"], "test.js"))).toBe(false);
  });
});
