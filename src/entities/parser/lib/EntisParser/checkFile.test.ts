import { describe, expect, it } from "vitest";
import { checkFile } from "./checkFile";

describe("entities/parser/lib/EntisParser/checkFile", () => {
  it("should check file", () => {
    expect(checkFile(new File(["test"], "test.srcxml"))).toBe(true);
    expect(checkFile(new File(["test"], "test.js"))).toBe(false);
  });
});
