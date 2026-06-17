import { type LanguageCode } from "iso-639-1";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_BATCH_SIZE } from "../../config";
import type { TranslationProcessMode } from "../translation/types";

export interface State {
  mode: TranslationProcessMode;
  batchSize: number;
  sourceLanguage: LanguageCode;
  targetLanguage: LanguageCode;
}

export const defaultState: State = {
  mode: "sequential",
  batchSize: DEFAULT_BATCH_SIZE,
  sourceLanguage: "ja",
  targetLanguage: "en",
};

export const useTranslationProcessSettingsStore = create<State>()(
  devtools(
    persist(
      immer(() => defaultState),
      { name: "translationProcessSettingsStore" },
    ),
    { name: "translationProcessSettingsStore" },
  ),
);
