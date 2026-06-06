import type { State } from "./store";

export const selectStatus = (state: State) => {
  return state.status;
};

export const selectTranslatingResource = (state: State) => {
  return state.translatingResource;
};

export const selectIsTranslating = (state: State) => {
  return state.status === "translating";
};
