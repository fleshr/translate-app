import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface State {
  files: Record<string, ArrayBuffer>;
}

export const defaultState: State = {
  files: {},
};

export const useFilesStore = create<State>()(
  devtools(
    immer(() => defaultState),
    { name: "filesStore" },
  ),
);
