import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/vanilla/shallow";
import type { Id } from "../common";

export type SessionStatus = "idle" | "translating" | "stopped";

export interface State {
  status: SessionStatus;
  translatingResource: Id | null;
  selectedResource: Id | null;
  selectedSegment: Id | null;
}

export const defaultState: State = {
  status: "idle",
  translatingResource: null,
  selectedResource: null,
  selectedSegment: null,
};

export const useSessionStore = createWithEqualityFn<State>()(
  devtools(
    immer(() => defaultState),
    { name: "sessionStore" },
  ),
  shallow,
);
