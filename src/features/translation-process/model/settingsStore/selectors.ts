import type { State } from "./store";

export const selectSettings = (state: State) => {
  return state;
};

export const selectMode = (state: State) => {
  return state.mode;
};

export const selectBatchSize = (state: State) => {
  return state.batchSize;
};

export const selectSourceLanguage = (state: State) => {
  return state.sourceLanguage;
};

export const selectTargetLanguage = (state: State) => {
  return state.targetLanguage;
};
