import type { BaseProps } from "@/shared/model/component";
import {
  ActionIcon,
  Tooltip,
  type ActionIconProps,
  type TooltipProps,
} from "@mantine/core";
import type { ComponentProps } from "react";

export type ActionIconWithTooltipProps = ActionIconProps &
  ComponentProps<"button"> &
  Pick<TooltipProps, "label">;

export const ActionIconWithTooltip = (
  props: BaseProps<ActionIconWithTooltipProps>,
) => {
  const {
    label,
    "data-testid": dataTestId = "ActionIconWithTooltip",
    ...restProps
  } = props;

  return (
    <Tooltip label={label} data-testid={`${dataTestId}.Tooltip`}>
      <ActionIcon {...restProps} data-testid={`${dataTestId}`} />
    </Tooltip>
  );
};
