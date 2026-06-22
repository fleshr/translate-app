export type LogType = "info" | "error" | "debug";

export interface LogEntry {
  id: string;
  type: LogType;
  message: string;
}
