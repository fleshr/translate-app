import { logger } from "@/shared/lib/logger";
import type { LoggerMessage } from "@/shared/model/logger";
import { Placeholder } from "@/shared/ui/Placeholder";
import { Stack, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useIntlayer } from "react-intlayer";
import { LOGS_LIMIT } from "../../config/logs";
import classes from "./LogsContainer.module.css";

export const LogsContainer = () => {
  const content = useIntlayer("LogsContainer");
  const ref = useRef<HTMLParagraphElement>(null);
  const [logs, setLogs] = useState<LoggerMessage[]>([]);

  useEffect(() => {
    ref.current?.scrollIntoView();
  });

  useEffect(() => {
    logger.setHandler((log) => {
      setLogs((logs) => [...logs.slice(logs.length - LOGS_LIMIT + 1), log]);
    });

    return () => {
      logger.clearHandler();
    };
  }, []);

  if (logs.length === 0) {
    return (
      <Placeholder
        text={content.noLogsText}
        subtext={content.noLogsSubtext}
        data-testid="LogsContainer.Placeholder"
      />
    );
  }

  return (
    <Stack gap={0} data-testid="LogsContainer">
      {logs.map(({ id, type, message }, index) => (
        <Text
          key={id}
          data-type={type}
          className={classes.text}
          ref={index === logs.length - 1 ? ref : null}
          data-testid={`LogsContainer.Log.${index}`}
        >
          [{type.toUpperCase()}] {message}
        </Text>
      ))}
    </Stack>
  );
};
