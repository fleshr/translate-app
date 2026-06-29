import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_CODE } from "../../config/code";

export interface State {
  code: string;
}

export const defaultState: State = {
  code: DEFAULT_CODE,
};

export const useUserScriptStore = create<State>()(
  devtools(
    persist(
      immer(() => defaultState),
      { name: "userScriptStore" },
    ),
    { name: "userScriptStore" },
  ),
);
