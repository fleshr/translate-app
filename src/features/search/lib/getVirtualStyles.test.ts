import { describe, expect, it } from "vitest";
import { getVirtualStyles } from "./getVirtualStyles";

describe("features/search/lib/getVirtualStyles", () => {
  it("should return styles for sticky element", () => {
    const styles = getVirtualStyles(100, true);

    expect(styles).toEqual({
      top: 0,
      left: 0,
      width: "100%",
      position: "sticky",
      zIndex: 1,
    });
  });

  it("should return styles for absolute element", () => {
    const styles = getVirtualStyles(100, false);

    expect(styles).toEqual({
      top: 0,
      left: 0,
      width: "100%",
      position: "absolute",
      transform: "translateY(100px)",
    });
  });
});
