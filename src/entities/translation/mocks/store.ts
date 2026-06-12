import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/store/store";
import {
  getTranslationBaseCommonMock,
  getTranslationBaseFileMock,
} from "./resource";
import { getTranslationSegmentMock } from "./segment";

const mockTranslationStoreState: State = {
  resources: {
    allIds: ["common-1", "file-1"],
    byId: {
      "common-1": getTranslationBaseCommonMock({ id: "common-1" }),
      "file-1": getTranslationBaseFileMock({ id: "file-1" }),
    },
  },
  segments: {
    allIds: ["segment-1", "segment-2", "segment-3"],
    byId: {
      "segment-1": getTranslationSegmentMock({
        id: "segment-1",
        originalText: "test1",
      }),
      "segment-2": getTranslationSegmentMock({
        id: "segment-2",
        originalText: "test2",
      }),
      "segment-3": getTranslationSegmentMock({
        id: "segment-3",
        originalText: "test3",
        machineTranslation: "",
        manualTranslation: "",
      }),
    },
  },
  relations: {
    resourceSegments: {
      "common-1": ["segment-1"],
      "file-1": ["segment-2", "segment-3"],
    },
    segmentResource: {
      "segment-1": "common-1",
      "segment-2": "file-1",
      "segment-3": "file-1",
    },
  },
};

export const getTranslationStoreStateMock = createMockFactory(
  mockTranslationStoreState,
);
