import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface State {
  files: Record<string, Uint8Array<ArrayBuffer>>;
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
