import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/searchStore/store";

const mockSearchStoreState: State = {
  searchText: "test",
  searchField: "originalText",
  caseSensitive: false,
  replaceText: "123",
  replaceSelected: ["segment-1", "segment-2", "segment-3"],
};

export const getSearchStoreStateMock = createMockFactory(mockSearchStoreState);
