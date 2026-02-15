import { createMockFactory } from "../lib/testing";
import type { State } from "../model/sessionStore";

export const mockSessionStoreState: State = {
  status: "idle",
  translatingResource: null,
  resourcesProgress: {
    "common-1": { done: 10, total: 10 },
    "file-1": { done: 5, total: 20 },
  },
  selectedResource: null,
  selectedSegment: null,
};

export const getSessionStoreStateMock = createMockFactory(
  mockSessionStoreState,
);
