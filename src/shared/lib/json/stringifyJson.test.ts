import { describe, expect, it } from "vitest";
import { stringifyJson } from "./stringifyJson";

const prettifiedString = `{
  "a": 1,
  "b": 2
}`;

describe("shared/lib/json/stringifyJson", () => {
  it("should prettify output", () => {
    const obj = { a: 1, b: 2 };
    expect(stringifyJson(obj)).toBe(prettifiedString);
  });
});
