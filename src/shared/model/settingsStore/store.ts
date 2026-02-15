import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { TranslatorConfig } from "../translator";

export interface State {
  view: {
    showBottomPanel: boolean;
    showSidePanel: boolean;
  };
  translator: {
    selected: string;
    configs: Record<string, TranslatorConfig>;
  };
}

export const defaultState: State = {
  view: {
    showBottomPanel: true,
    showSidePanel: true,
  },
  translator: {
    selected: "openai",
    configs: {},
  },
};

export const useSettingsStore = create<State>()(
  devtools(
    persist(
      immer(() => defaultState),
      { name: "settingsStore" },
    ),
    { name: "settingsStore" },
  ),
);
