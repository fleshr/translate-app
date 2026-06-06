import type { Id } from "@/shared/model/common";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { TranslationProcessStatus } from "../translation/types";

export interface State {
  status: TranslationProcessStatus;
  translatingResource: Id | null;
}

export const defaultState: State = {
  status: "idle",
  translatingResource: null,
};

export const useTranslationProcessStore = create<State>()(
  devtools(
    immer(() => defaultState),
    { name: "translationProcessStore" },
  ),
);
