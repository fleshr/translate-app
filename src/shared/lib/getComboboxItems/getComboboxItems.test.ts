import { describe, expect, it } from "vitest";
import { getComboboxItems } from "./getComboboxItems";

describe("shared/lib/file/getComboboxItems", () => {
  it("should return empty array", () => {
    const result = getComboboxItems({});
    expect(result).toEqual([]);
  });

  it("should return array with items", () => {
    const result = getComboboxItems({
      valueA: { name: "labelA" },
      valueB: { name: "labelB" },
    });

    expect(result).toEqual([
      { label: "labelA", value: "valueA" },
      { label: "labelB", value: "valueB" },
    ]);
  });
});
