import type { LoggerMessage } from "@/shared/model/logger";
import type { Decorator } from "@storybook/react-vite";
import { useEffect } from "react";
import { logger } from "../logger";

export const withLoggerMessages = (
  messages: LoggerMessage[] = [],
): Decorator => {
  return (Story) => {
    useEffect(() => {
      messages.forEach(({ type, message }) => {
        logger[type](message);
      });
    }, []);

    return <Story />;
  };
};
