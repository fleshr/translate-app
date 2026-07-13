import { describe, expect, it } from "vitest";
import { checkFile } from "./checkFile";

describe("entities/parser/lib/KAGScenarioParser/checkFile", () => {
  it("should check file", () => {
    expect(checkFile(new File(["test"], "test.ks"))).toBeTruthy();
    expect(checkFile(new File(["test"], "test.js"))).toBeFalsy();
  });
});
