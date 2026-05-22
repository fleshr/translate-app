import type { Module } from "../module";
import { type State } from "./store";

export const selectProjectParser = (state: State): Module | string => {
  return state.parser;
};

export const selectProject = (state: State): State => {
  return state;
};
