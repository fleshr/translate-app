import { createMockFactory } from "../lib/testing";
import type { State } from "../model/sessionStore";

export const mockSessionStoreState: State = {
  selectedResource: null,
  selectedSegment: null,
};

export const getSessionStoreStateMock = createMockFactory(
  mockSessionStoreState,
);
