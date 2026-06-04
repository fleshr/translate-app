import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/store/store";
import {
  getTranslationCommonMock,
  getTranslationFileMock,
  getTranslationSegmentMock,
} from "./translation";

const mockTranslationStoreState: State = {
  resources: {
    allIds: ["common-1", "file-1"],
    byId: {
      "common-1": {
        ...getTranslationCommonMock(),
        segments: ["segment-1"],
      },
      "file-1": {
        ...getTranslationFileMock(),
        segments: ["segment-2", "segment-3"],
      },
    },
  },
  segments: {
    allIds: ["segment-1", "segment-2", "segment-3"],
    byId: {
      "segment-1": getTranslationSegmentMock({
        id: "segment-1",
        resourceId: "common-1",
        originalText: "test1",
      }),
      "segment-2": getTranslationSegmentMock({
        id: "segment-2",
        resourceId: "file-1",
        originalText: "test2",
      }),
      "segment-3": getTranslationSegmentMock({
        id: "segment-3",
        resourceId: "file-1",
        originalText: "test3",
        machineTranslation: "",
        manualTranslation: "",
      }),
    },
  },
};

export const getTranslationStoreStateMock = createMockFactory(
  mockTranslationStoreState,
);
