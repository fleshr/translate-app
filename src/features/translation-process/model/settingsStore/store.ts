import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_BATCH_SIZE } from "../../config";
import type { TranslationProcessMode } from "../translation/types";

export interface State {
  mode: TranslationProcessMode;
  batchSize: number;
}

export const defaultState: State = {
  mode: "sequential",
  batchSize: DEFAULT_BATCH_SIZE,
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
