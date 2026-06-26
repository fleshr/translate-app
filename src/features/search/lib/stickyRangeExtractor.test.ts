import { defaultRangeExtractor, type Range } from "@tanstack/react-virtual";
import { describe, expect, it, vi } from "vitest";
import { stickyRangeExtractor } from "./stickyRangeExtractor";

vi.mock("@tanstack/react-virtual", { spy: true });

describe("features/search/lib/stickyRangeExtractor", () => {
  it("should return indexes and sticky index within range", () => {
    vi.mocked(defaultRangeExtractor).mockReturnValue([0, 1, 2, 3, 4, 5]);
    const result = stickyRangeExtractor({ startIndex: 0 } as Range, [0, 3]);

    expect(result.indexes).toEqual([0, 1, 2, 3, 4, 5]);
    expect(result.stickyIndex).toEqual(0);
  });

  it("should return indexes and sticky index outside range", () => {
    vi.mocked(defaultRangeExtractor).mockReturnValue([10, 11, 12, 13, 14, 15]);
    const result = stickyRangeExtractor({ startIndex: 10 } as Range, [0, 3]);

    expect(result.indexes).toEqual([3, 10, 11, 12, 13, 14, 15]);
    expect(result.stickyIndex).toEqual(3);
  });

  it("should fallback when no sticky index before range", () => {
    vi.mocked(defaultRangeExtractor).mockReturnValue([0, 1, 2, 3, 4, 5]);
    const result = stickyRangeExtractor({ startIndex: 0 } as Range, [9, 12]);

    expect(result.indexes).toEqual([0, 1, 2, 3, 4, 5]);
    expect(result.stickyIndex).toEqual(0);
  });
});
