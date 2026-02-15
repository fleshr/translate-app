export type LoggerHandler = (message: LoggerMessage) => void;

export type LoggerMessageType = "info" | "error" | "debug";

export interface LoggerMessage {
  id: string;
  type: LoggerMessageType;
  message: string;
}
