import type { BaseProps } from "@/shared/model/component";
import {
  Card,
  Checkbox,
  Collapse,
  Divider,
  Group,
  Highlight,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type MouseEvent } from "react";

export interface ResultItem {
  value: string;
  label: string;
}

interface ResultCardProps {
  title: string;
  items: ResultItem[];
  highlight: string;
  selected?: string[];
  selectable?: boolean;
  onSelect?: (selected: string[]) => void;
  onClick?: (value: string) => void;
}

export const ResultCard = (props: BaseProps<ResultCardProps>) => {
  const {
    title,
    items,
    selected = [],
    selectable = false,
    highlight,
    onSelect,
    onClick,
    "data-testid": dataTestId = "ResultCard",
  } = props;
  const [opened, { toggle }] = useDisclosure(true);

  const isFullSelected =
    selectable && items.every(({ value }) => selected.includes(value));

  const isPartialSelected =
    selectable && items.some(({ value }) => selected.includes(value));

  const handleItemToggle = (value: string) => (e: MouseEvent) => {
    e.stopPropagation();

    if (selected.includes(value)) {
      onSelect?.(selected.filter((selected) => selected !== value));
    } else {
      onSelect?.([...selected, value]);
    }
  };

  const handleItemsToggle = () => {
    if (isFullSelected) {
      onSelect?.([]);
    } else {
      onSelect?.(items.map(({ value }) => value));
    }
  };

  return (
    <Card withBorder padding={0} data-testid={dataTestId}>
      <Stack gap={0}>
        <Group
          gap="xs"
          px="sm"
          py="xs"
          onClick={toggle}
          data-testid={`${dataTestId}.Title`}
        >
          {selectable && (
            <Checkbox
              size="xs"
              checked={isFullSelected}
              onChange={handleItemsToggle}
              onClick={(e) => e.stopPropagation()}
              indeterminate={isPartialSelected && !isFullSelected}
              data-testid={`${dataTestId}.Title.Checkbox`}
            />
          )}
          <Text size="sm">{title}</Text>
        </Group>
        <Collapse in={opened} data-testid={`${dataTestId}.Collapse`}>
          <Divider mx="sm" />
          <Stack gap={0} py={4} data-testid={`${dataTestId}.List`}>
            {items.map(({ label, value }, index) => (
              <Group
                key={value}
                gap="xs"
                px="sm"
                py={4}
                wrap="nowrap"
                onClick={() => onClick?.(value)}
                data-testid={`${dataTestId}.Item.${index}`}
              >
                {selectable && (
                  <Checkbox
                    size="xs"
                    checked={selected.includes(value)}
                    onClick={handleItemToggle(value)}
                    data-testid={`${dataTestId}.Item.${index}.Checkbox`}
                  />
                )}
                <Highlight size="sm" lineClamp={1} highlight={highlight}>
                  {label}
                </Highlight>
              </Group>
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
};
