import { describe, expect, it } from "vitest";
import { getPercentage } from "./getPercentage";

describe("shared/lib/getPercentage", () => {
  it("should return the correct percentage", () => {
    for (let i = 0; i <= 100; i += 10) {
      expect(getPercentage(i, 100)).toBe(`${i}%`);
    }
  });

  it("should return 0% when total is 0", () => {
    expect(getPercentage(0, 0)).toBe("0%");
  });

  it("should use absolute values if negative", () => {
    expect(getPercentage(-10, -100)).toBe("10%");
  });
});
