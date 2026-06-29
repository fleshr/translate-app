import { describe, expect, it } from "vitest";
import { parseFuntionFromCode } from "./parseFuntionFromCode";

const testCode1 = 'return async function () { console.log("Test") }';
const testCode2 = "console.log('Test')";

describe("features/script-editor/lib/parseFuntionFromCode", () => {
  it("should parse function from code", () => {
    const fn = parseFuntionFromCode(testCode1);
    expect(fn).toEqual(expect.any(Function));
  });

  it("should throw error if code is not a function", () => {
    expect(() => parseFuntionFromCode(testCode2)).toThrow();
  });
});
