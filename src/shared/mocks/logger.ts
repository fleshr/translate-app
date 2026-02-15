import type { LoggerMessage } from "../model/logger";

export const mockInfoMessage: LoggerMessage = {
  id: "1",
  type: "info",
  message: "Info message",
};

export const mockDebugMessage: LoggerMessage = {
  id: "2",
  type: "debug",
  message: "Debug message",
};

export const mockErrorMessage: LoggerMessage = {
  id: "3",
  type: "error",
  message: "Error message",
};
