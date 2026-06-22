import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Project } from "../project/types";

export type State = Project;

export const defaultState: State = {
  parser: "entis",
};

export const useProjectStore = create<State>()(
  devtools(
    immer(() => defaultState),
    { name: "projectStore" },
  ),
);
