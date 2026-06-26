import type { BaseProps } from "@/shared/model/component";
import {
  setSessionSelectedResource,
  setSessionSelectedSegment,
} from "@/shared/model/sessionStore";
import {
  Checkbox,
  Group,
  Highlight,
  type MantineStyleProp,
} from "@mantine/core";
import { RESULT_HEIGHT } from "../../config/result";
import type { SearchResultSelect } from "../../model/searchResult";
import { toggleReplaceSelected } from "../../model/searchStore/actions";
import {
  selectIsSelected,
  selectSearchText,
} from "../../model/searchStore/selectors";
import { useSearchStore } from "../../model/searchStore/store";
import styles from "./ResultSelect.module.css";

interface ResultSelectProps extends BaseProps {
  result: SearchResultSelect;
  style?: MantineStyleProp;
}

export const ResultSelect = (props: ResultSelectProps) => {
  const {
    style,
    result: { label, resourceId, segmentId },
    "data-testid": dataTestId = "ResultSelect",
  } = props;
  const searchText = useSearchStore(selectSearchText);
  const isSelected = useSearchStore(selectIsSelected(segmentId));

  const handleSelect = () => {
    toggleReplaceSelected(segmentId);
  };

  const handleClick = () => {
    setSessionSelectedSegment(segmentId);
    setSessionSelectedResource(resourceId);
  };

  return (
    <Group
      gap="xs"
      style={style}
      h={RESULT_HEIGHT}
      onClick={handleClick}
      className={styles.container}
      data-testid={dataTestId}
    >
      <Checkbox
        size="xs"
        checked={isSelected}
        onClick={(e) => e.stopPropagation()}
        onChange={handleSelect}
        data-testid={`${dataTestId}.Checkbox`}
      />
      <Highlight
        size="sm"
        lineClamp={1}
        highlight={searchText}
        data-testid={`${dataTestId}.Highlight`}
      >
        {label}
      </Highlight>
    </Group>
  );
};
