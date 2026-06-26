import { renderHook } from "@/shared/lib/testing";
import { describe, expect, it, vi } from "vitest";
import { stickyRangeExtractor } from "./stickyRangeExtractor";
import { useResultVirtualizer } from "./useResultVirtualizer";

vi.mock("./stickyRangeExtractor", { spy: true });

describe("features/search/lib/useResultVirtualizer", () => {
  it("should return virtualizer, parentRef, isActiveSticky", () => {
    const { result } = renderHook(() => useResultVirtualizer([]));

    expect(result.current.virtualizer).toBeDefined();
    expect(result.current.parentRef).toBeDefined();
    expect(result.current.isActiveSticky).toBeInstanceOf(Function);
  });

  it("should update active sticky index", () => {
    vi.mocked(stickyRangeExtractor).mockReturnValue({
      indexes: [0, 1, 2, 3, 4, 5],
      stickyIndex: 0,
    });
    const { result } = renderHook(() => useResultVirtualizer([]));
    expect(result.current.isActiveSticky(0)).toEqual(true);
  });
});
