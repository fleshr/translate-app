import type { Id } from "../common";
import { type SessionStatus, type State } from "./store";

export const selectStatus = (state: State): SessionStatus => {
  return state.status;
};

export const selectSelectedResource = (state: State): Id | null => {
  return state.selectedResource;
};

export const selectSelectedSegment = (state: State): Id | null => {
  return state.selectedSegment;
};

export const selectTranslatingResource = (state: State): Id | null => {
  return state.translatingResource;
};

export const selectIsSegmentSelected = (id: Id) => {
  return (state: State): boolean => state.selectedSegment === id;
};

export const selectIsTranslating = (state: State): boolean => {
  return state.status === "translating";
};
