import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Id } from "../common";

export interface State {
  selectedResource: Id | null;
  selectedSegment: Id | null;
}

export const defaultState: State = {
  selectedResource: null,
  selectedSegment: null,
};

export const useSessionStore = create<State>()(
  devtools(
    immer(() => defaultState),
    { name: "sessionStore" },
  ),
);
