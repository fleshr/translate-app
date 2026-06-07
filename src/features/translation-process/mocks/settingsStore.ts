import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/settingsStore/store";

const settingsStoreStateMock: State = {
  mode: "sequential",
  batchSize: 10,
};

export const getTranslationProcessSettingsStoreStateMock = createMockFactory(
  settingsStoreStateMock,
);
