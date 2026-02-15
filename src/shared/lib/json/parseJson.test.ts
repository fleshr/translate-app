import { describe, expect, it } from "vitest";
import { parseJson } from "./parseJson";

describe("shared/lib/json/parseJson", () => {
  it("should parse JSON", () => {
    const result = parseJson('{ "a": 1, "b": 2 }');
    expect(result).toEqual({ a: 1, b: 2 });
  });
});
