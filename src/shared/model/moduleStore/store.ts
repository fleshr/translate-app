import { del, get, set } from "idb-keyval";
import { isDeepEqual } from "remeda";
import {
  createJSONStorage,
  devtools,
  persist,
  type StateStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import type { Module } from "../module/types";

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export interface State {
  parsers: Record<string, Module>;
}

export const defaultState: State = {
  parsers: {},
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
