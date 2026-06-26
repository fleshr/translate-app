import type { MantineStyleProp } from "@mantine/core";

export const getVirtualStyles = (
  start: number,
  isActiveSticky: boolean,
): MantineStyleProp => {
  return {
    top: 0,
    left: 0,
    width: "100%",
    ...(isActiveSticky
      ? { position: "sticky", zIndex: 1 }
      : { position: "absolute", transform: `translateY(${start}px)` }),
  };
};
