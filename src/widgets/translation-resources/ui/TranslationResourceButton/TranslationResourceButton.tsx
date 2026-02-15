import { getPercentage } from "@/shared/lib/getPercentage";
import type { Id, Progress } from "@/shared/model/common";
import type { BaseProps } from "@/shared/model/component";
import type { TranslationBaseResource } from "@/shared/model/translation";
import { Badge, Button, Group, Loader, Tooltip } from "@mantine/core";

interface TranslationResourceButtonProps {
  resource: TranslationBaseResource;
  progress?: Progress;
  isSelected?: boolean;
  isProcessing?: boolean;
  onSelect?: (id: Id) => void;
}

export const TranslationResourceButton = (
  props: BaseProps<TranslationResourceButtonProps>,
) => {
  const {
    resource,
    progress,
    isSelected = false,
    isProcessing = false,
    onSelect,
    "data-testid": dataTestId = "TranslationResourceButton",
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
      onClick={() => onSelect?.(resource.id)}
      variant={isSelected ? "filled" : "subtle"}
      justify="space-between"
      rightSection={badge}
      fullWidth
      data-testid={dataTestId}
    >
      <Group gap="xs">
        {resource.name}
        {isProcessing && (
          <Loader
            size={12}
            variant=""
            color={isSelected ? "white" : "dark"}
            data-testid={`${dataTestId}.Loader`}
          />
        )}
      </Group>
    </Button>
  );
};
