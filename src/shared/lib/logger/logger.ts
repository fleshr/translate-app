import type { LoggerHandler } from "@/shared/model/logger";
import { nanoid } from "nanoid";

class Logger {
  private handler?: LoggerHandler;

  setHandler(handler: LoggerHandler) {
    this.handler = handler;
  }

  clearHandler() {
    this.handler = undefined;
  }

  debug(message: string): void {
    this.handler?.({
      id: nanoid(),
      type: "debug",
      message,
    });
  }

  info(message: string): void {
    this.handler?.({
      id: nanoid(),
      type: "info",
      message,
    });
  }

  error(message: string): void {
    this.handler?.({
      id: nanoid(),
      type: "error",
      message,
    });
  }
}

export const logger = new Logger();
