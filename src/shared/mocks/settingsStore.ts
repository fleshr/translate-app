import { createMockFactory } from "../lib/testing";
import type { State } from "../model/settingsStore";

const mockSessionStoreState: State = {
  view: {
    showBottomPanel: true,
    showSidePanel: true,
  },
};

export const getSettingsStoreStateMock = createMockFactory(
  mockSessionStoreState,
);
