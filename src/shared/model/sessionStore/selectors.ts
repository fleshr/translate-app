import type { Id } from "../common";
import { type State } from "./store";

export const selectSelectedResource = (state: State): Id | null => {
  return state.selectedResource;
};

export const selectSelectedSegment = (state: State): Id | null => {
  return state.selectedSegment;
};
