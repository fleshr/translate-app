import type { State } from "./store";

export const selectCode = (state: State) => {
  return state.code;
};
