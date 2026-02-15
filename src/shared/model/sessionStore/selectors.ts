import type { Id, Progress } from "../common";
import { type SessionStatus, type State } from "./store";

export const selectStatus = (state: State): SessionStatus => {
  return state.status;
};

export const selectSelectedResource = (state: State): string | null => {
  return state.selectedResource;
};

export const selectSelectedSegment = (state: State): string | null => {
  return state.selectedSegment;
};

export const selectResourcesProgress = (state: State): Record<Id, Progress> => {
  return state.resourcesProgress;
};

export const selectTranslatingResource = (state: State): string | null => {
  return state.translatingResource;
};

export const selectResourceProgress = (id: Id | null) => {
  return (state: State): Progress | undefined => {
    return id ? state.resourcesProgress[id] : undefined;
  };
};

export const selectTranslatingResourceProgress = (
  state: State,
): Progress | undefined => {
  return selectResourceProgress(state.translatingResource)(state);
};

export const selectTotalProgress = (state: State): Progress => {
  const resources = Object.values(state.resourcesProgress);
  const translatedResources = resources.filter(
    ({ done, total }) => done === total,
  );

  return { done: translatedResources.length, total: resources.length };
};

export const selectIsSegmentSelected = (id: Id) => {
  return (state: State) => state.selectedSegment === id;
};

export const selectIsTranslating = (state: State) => {
  return state.status === "translating";
};
