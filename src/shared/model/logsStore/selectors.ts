import type { LogEntry } from "../logs";
import type { State } from "./store";

export const selectLogs = (state: State): LogEntry[] => {
  return state.logs;
};
