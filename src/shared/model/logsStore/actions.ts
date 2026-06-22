import { nanoid } from "nanoid";
import type { LogType } from "../logs";
import { useLogsStore } from "./store";

export const addLog = (type: LogType, message: string) => {
  useLogsStore.setState(
    (state) => {
      if (state.logs.length >= state.limit) {
        state.logs.splice(0, state.logs.length - state.limit + 1);
      }

      state.logs.push({ id: nanoid(), type, message });
    },
    undefined,
    "addLog",
  );
};
