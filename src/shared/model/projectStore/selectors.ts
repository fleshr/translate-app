import { type State } from "./store";

export const selectProjectParser = (state: State): string => {
  return state.parser;
};
export const selectProject = (state: State): State => {
  return state;
};
