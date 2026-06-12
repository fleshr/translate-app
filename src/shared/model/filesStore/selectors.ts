import type { State } from "./store";

export const selectFile = (id: string) => {
  return (state: State) => {
    return state.files[id];
  };
};

export const selectFiles = (state: State) => {
  return state.files;
};
