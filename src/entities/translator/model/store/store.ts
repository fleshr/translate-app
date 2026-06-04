import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { TranslatorConfig } from "../translator";

export interface State {
  selected: string;
  configs: Record<string, TranslatorConfig>;
}

export const defaultState: State = {
  selected: "openai",
  configs: {},
};

export const useTranslatorStore = create<State>()(
  devtools(
    persist(
      immer(() => defaultState),
      { name: "translatorStore" },
    ),
    { name: "translatorStore" },
  ),
);
