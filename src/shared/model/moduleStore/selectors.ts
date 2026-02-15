import { map, pick, pipe, values } from "remeda";
import type { BaseModule, Module } from "../module/types";
import type { State } from "./store";

export const selectBaseModule = (type: keyof State, id: string) => {
  return (state: State): BaseModule | undefined => {
    const parser = state[type][id];
    return parser && pick(parser, ["id", "name", "version", "shortName"]);
  };
};

export const selectBaseModules = (type: keyof State) => {
  return (state: State): BaseModule[] => {
    return pipe(
      state[type],
      values(),
      map((parser) => pick(parser, ["id", "name", "version", "shortName"])),
    );
  };
};

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

export const selectModulesMap = (type: keyof State) => {
  return (state: State): Record<string, Module> => {
    return state[type];
  };
};
