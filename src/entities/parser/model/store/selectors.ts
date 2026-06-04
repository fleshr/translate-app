import type { Module } from "@/shared/model/module";
import type { State } from "./store";

export const selectParser = (id: string) => {
  return (state: State): Module | undefined => {
    return state.parsers[id];
  };
};

export const selectParsers = (state: State): Module[] => {
  return Object.values(state.parsers);
};
