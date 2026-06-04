import { getPercentage } from "@/shared/lib/getPercentage";
import type { Progress } from "@/shared/model/common";
import type { BaseProps } from "@/shared/model/component";
import { Badge, Button, Group, Loader, Tooltip } from "@mantine/core";

export interface ProgressButtonProps {
  label: string;
  progress?: Progress;
  isSelected?: boolean;
  isProcessing?: boolean;
  onClick?: () => void;
}

export const ProgressButton = (props: BaseProps<ProgressButtonProps>) => {
  const {
    label,
    progress,
    isSelected = false,
    isProcessing = false,
    onClick,
    "data-testid": dataTestId = "ProgressButton",
  } = props;

  const badge = progress && (
    <Tooltip
      position="right"
      label={`${progress.done}/${progress.total}`}
      data-testid={`${dataTestId}.Tooltip`}
    >
      <Badge
        size="xs"
        variant={isSelected ? "white" : "filled"}
        data-testid={`${dataTestId}.Badge`}
      >
        {getPercentage(progress.done, progress.total)}
      </Badge>
    </Tooltip>
  );

  return (
    <Button
      size="xs"
      onClick={() => onClick?.()}
      variant={isSelected ? "filled" : "subtle"}
      justify="space-between"
      rightSection={badge}
      fullWidth
      data-selected={isSelected}
      data-testid={dataTestId}
    >
      <Group gap="xs">
        {label}
        {isProcessing && (
          <Loader
            size={12}
            color={isSelected ? "white" : "dark"}
            data-testid={`${dataTestId}.Loader`}
          />
        )}
      </Group>
    </Button>
  );
};
