import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/settingsStore/store";

const settingsStoreStateMock: State = {
  mode: "sequential",
  batchSize: 10,
  sourceLanguage: "ja",
  targetLanguage: "en",
};

export const getTranslationProcessSettingsStoreStateMock = createMockFactory(
  settingsStoreStateMock,
);
