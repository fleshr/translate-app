import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { TranslationProcessMode } from "../translation/types";

export interface State {
  mode: TranslationProcessMode;
  batchSize: number;
}

export const defaultState: State = {
  mode: "sequential",
  batchSize: 10,
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
