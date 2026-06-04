import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface State {
  view: {
    showBottomPanel: boolean;
    showSidePanel: boolean;
  };
}

export const defaultState: State = {
  view: {
    showBottomPanel: true,
    showSidePanel: true,
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
