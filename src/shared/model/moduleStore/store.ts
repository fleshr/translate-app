import { builtinParsersMeta } from "@/shared/constants/parsers";
import { isDeepEqual } from "remeda";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import type { Module } from "../module";
import { storage } from "./storage";

export interface State {
  parsers: Record<string, Module>;
}

export const defaultState: State = {
  parsers: builtinParsersMeta,
};

export const useModuleStore = createWithEqualityFn<State>()(
  devtools(
    persist(
      immer(() => defaultState),
      {
        name: "moduleStore",
        storage: createJSONStorage(() => storage),
      },
    ),
    { name: "moduleStore" },
  ),
  isDeepEqual,
);
