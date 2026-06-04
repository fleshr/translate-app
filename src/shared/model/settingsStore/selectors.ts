import type { State } from "./store";

export const selectViewShowBottomPanel = (state: State): boolean => {
  return state.view.showBottomPanel;
};

export const selectViewShowSidePanel = (state: State): boolean => {
  return state.view.showSidePanel;
};
