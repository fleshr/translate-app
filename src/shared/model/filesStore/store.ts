import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface State {
  files: Record<string, ArrayBuffer>;
}

export const defaultState: State = {
  files: {},
};

export const useFilesStore = create<State>()(
  devtools(() => defaultState, { name: "filesStore" }),
);
