import type { BaseProps } from "@/shared/model/component";
import { Stack, Text } from "@mantine/core";
import type { ReactNode } from "react";

export interface PlaceholderProps {
  text: ReactNode;
  subtext?: ReactNode;
}

export const Placeholder = (props: BaseProps<PlaceholderProps>) => {
  const { text, subtext, "data-testid": dataTestId = "Placeholder" } = props;

  return (
    <Stack gap={0} align="center" data-testid={dataTestId}>
      <Text data-testid={`${dataTestId}.Text`}>{text}</Text>
      {subtext && (
        <Text size="xs" c="dimmed" data-testid={`${dataTestId}.Subtext`}>
          {subtext}
        </Text>
      )}
    </Stack>
  );
};
