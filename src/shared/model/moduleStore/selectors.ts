import { values } from "remeda";
import type { Module } from "../module/types";
import type { State } from "./store";

export const selectModule = (type: keyof State, id: string) => {
  return (state: State): Module | undefined => {
    return state[type][id];
  };
};

export const selectModules = (type: keyof State) => {
  return (state: State): Module[] => {
    return values(state[type]);
  };
};
