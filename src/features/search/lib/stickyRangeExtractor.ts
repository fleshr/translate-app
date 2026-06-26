import { type Range, defaultRangeExtractor } from "@tanstack/react-virtual";

export const stickyRangeExtractor = (range: Range, stickyIndexes: number[]) => {
  const stickyIndex =
    [...stickyIndexes].reverse().find((index) => range.startIndex >= index) ??
    0;

  const next = new Set([stickyIndex, ...defaultRangeExtractor(range)]);
  const indexes = [...next].sort((a, b) => a - b);

  return { indexes, stickyIndex };
};
