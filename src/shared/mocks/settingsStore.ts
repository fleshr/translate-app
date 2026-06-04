import { createMockFactory } from "../lib/testing";
import type { State } from "../model/settingsStore";

const mockSessionStoreState: State = {
  view: {
    showBottomPanel: true,
    showSidePanel: true,
  },
  translator: {
    selected: "openai",
    configs: {},
  },
};

export const getSettingsStoreStateMock = createMockFactory(
  mockSessionStoreState,
);
