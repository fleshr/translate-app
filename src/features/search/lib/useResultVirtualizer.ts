import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { RESULT_GAP, RESULT_HEIGHT } from "../config/result";
import type { SearchResult } from "../model/searchResult";
import { getHeaderIndexes } from "./getHeaderIndexes";
import { stickyRangeExtractor } from "./stickyRangeExtractor";

export const useResultVirtualizer = (results: SearchResult[]) => {
  const activeStickyIndexRef = useRef(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const stickyIndexes = getHeaderIndexes(results);

  const isActiveSticky = (index: number) => {
    return activeStickyIndexRef.current === index;
  };

  const virtualizer = useVirtualizer({
    gap: RESULT_GAP,
    useFlushSync: false,
    count: results.length,
    estimateSize: () => RESULT_HEIGHT,
    getScrollElement: () => parentRef.current,
    rangeExtractor: (range) => {
      const { indexes, stickyIndex } = stickyRangeExtractor(
        range,
        stickyIndexes,
      );

      activeStickyIndexRef.current = stickyIndex;
      return indexes;
    },
  });

  return { virtualizer, parentRef, isActiveSticky };
};
