import { createMockFactory } from "../lib/testing";
import type { State } from "../model/sessionStore";

export const mockSessionStoreState: State = {
  status: "idle",
  translatingResource: null,
  selectedResource: null,
  selectedSegment: null,
};

export const getSessionStoreStateMock = createMockFactory(
  mockSessionStoreState,
);
