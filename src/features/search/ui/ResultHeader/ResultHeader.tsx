import type { BaseProps } from "@/shared/model/component";
import { Group, Text, type MantineStyleProp } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { RESULT_HEIGHT } from "../../config/result";
import type { SearchResultHeader } from "../../model/searchResult";
import styles from "./ResultHeader.module.css";

interface ResultHeaderProps extends BaseProps {
  result: SearchResultHeader;
  style?: MantineStyleProp;
}

export const ResultHeader = (props: ResultHeaderProps) => {
  const {
    style,
    result: { label },
    "data-testid": dataTestId = "ResultHeader",
  } = props;

  return (
    <Group
      gap="xs"
      style={style}
      h={RESULT_HEIGHT}
      className={styles.container}
      data-testid={dataTestId}
    >
      <IconChevronDown size={16} />
      <Text size="sm" lineClamp={1}>
        {label}
      </Text>
    </Group>
  );
};
