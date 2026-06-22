import { createMockFactory } from "../lib/testing";
import type { State } from "../model/logsStore";

const mockLogsStoreState: State = {
  limit: 10,
  logs: [
    { id: "1", type: "info", message: "Info message" },
    { id: "2", type: "debug", message: "Debug message" },
    { id: "3", type: "error", message: "Error message" },
  ],
};

export const getLogsStoreStateMock = createMockFactory(mockLogsStoreState);
