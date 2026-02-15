import type { BaseProps } from "@/shared/model/component";
import { Progress, Stack, Text, Tooltip } from "@mantine/core";
import type { ReactNode } from "react";

export interface ProgressBarProps {
  title: string | ReactNode;
  done: number;
  total: number;
}

export const ProgressBar = (props: BaseProps<ProgressBarProps>) => {
  const {
    title,
    done,
    total,
    "data-testid": dataTestId = "ProgressBar",
  } = props;
  const progress = (done / total) * 100;
  const label = `${done}/${total}`;

  return (
    <Stack w={120} gap={4} data-testid={dataTestId}>
      <Text size="xs" lh={1} data-testid={`${dataTestId}.Title`}>
        {title}
      </Text>
      <Tooltip label={label} data-testid={`${dataTestId}.Tooltip`}>
        <Progress.Root size="lg" data-testid={`${dataTestId}.Progress`}>
          <Progress.Section value={progress}>
            <Progress.Label data-testid={`${dataTestId}.ProgressLabel`}>
              {label}
            </Progress.Label>
          </Progress.Section>
        </Progress.Root>
      </Tooltip>
    </Stack>
  );
};
