import { idbStorage } from "@/shared/lib/storage";
import type { Module } from "@/shared/model/module";
import { isDeepEqual } from "remeda";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import { builtinParsersMeta } from "../builtin";

export interface State {
  parsers: Record<string, Module>;
}

export const defaultState: State = {
  parsers: builtinParsersMeta,
};

export const useParserStore = createWithEqualityFn<State>()(
  devtools(
    persist(
      immer(() => defaultState),
      { name: "parserStore", storage: createJSONStorage(() => idbStorage) },
    ),
    { name: "parserStore" },
  ),
  isDeepEqual,
);
