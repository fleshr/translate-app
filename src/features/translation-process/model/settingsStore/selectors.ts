import type { State } from "./store";

export const selectMode = (state: State) => {
  return state.mode;
};

export const selectBatchSize = (state: State) => {
  return state.batchSize;
};
