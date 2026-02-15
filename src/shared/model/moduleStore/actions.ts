import type { Module } from "../module/types";
import { useModuleStore, type State } from "./store";

export const addModule = (type: keyof State, module: Module) => {
  useModuleStore.setState(
    (state) => {
      state[type][module.id] = module;
    },
    undefined,
    "addModule",
  );
};

export const removeModule = (type: keyof State, id: string) => {
  useModuleStore.setState(
    (state) => {
      delete state[type][id];
    },
    undefined,
    "removeModule",
  );
};
