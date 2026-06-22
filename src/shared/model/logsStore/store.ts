import { LOGS_LIMIT } from "@/shared/config/logs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { LogEntry } from "../logs";

export interface State {
  limit: number;
  logs: LogEntry[];
}

export const defaultState: State = {
  limit: LOGS_LIMIT,
  logs: [],
};

export const useLogsStore = create<State>()(
  devtools(
    immer(() => defaultState),
    { name: "logsStore" },
  ),
);
