import { createMockFactory } from "@/shared/lib/testing";
import type {
  SearchResultHeader,
  SearchResultSelect,
} from "../model/searchResult";

const mockSearchResultHeader: SearchResultHeader = {
  label: "Header",
  type: "header",
  resourceId: "file-1",
};

export const getSearchResultHeaderMock = createMockFactory(
  mockSearchResultHeader,
);

const mockSearchResultSelect: SearchResultSelect = {
  label: "Select",
  type: "select",
  resourceId: "file-1",
  segmentId: "segment-1",
};

export const getSearchResultSelectMock = createMockFactory(
  mockSearchResultSelect,
);
