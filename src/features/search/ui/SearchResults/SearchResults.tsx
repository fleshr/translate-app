"use no memo";
import { selectResources, useTranslationStore } from "@/entities/translation";
import type { BaseProps } from "@/shared/model/component";
import { Checkbox, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { useIntlayer } from "react-intlayer";
import { getSearchResults } from "../../lib/getSearchResults";
import { getVirtualStyles } from "../../lib/getVirtualStyles";
import { isSearchResultSelect } from "../../lib/guards";
import { useResultVirtualizer } from "../../lib/useResultVirtualizer";
import { setReplaceSelected } from "../../model/searchStore/actions";
import {
  selectReplaceSelected,
  selectSearchValues,
} from "../../model/searchStore/selectors";
import { useSearchStore } from "../../model/searchStore/store";
import { SearchResult } from "../SearchResult/SearchResult";

export const SearchResults = (props: BaseProps) => {
  const { "data-testid": dataTestId = "SearchResults" } = props;
  const content = useIntlayer("SearchResults");
  const resources = useTranslationStore(selectResources);
  const selected = useSearchStore(selectReplaceSelected);
  const searchValues = useSearchStore(selectSearchValues);
  const results = getSearchResults(resources, searchValues);
  const selectResults = results.filter(isSearchResultSelect);
  const isAllSelected =
    selectResults.length > 0 && selected.length === selectResults.length;
  const { virtualizer, parentRef, isActiveSticky } =
    useResultVirtualizer(results);

  const handleSelectAll = () => {
    if (!isAllSelected) {
      setReplaceSelected(selectResults.map(({ segmentId }) => segmentId));
    } else {
      setReplaceSelected([]);
    }
  };

  return (
    <Stack gap="xs" data-testid={dataTestId}>
      <Group justify="space-between">
        <Text>{content.resultsLabel}</Text>
        <Checkbox
          size="xs"
          checked={isAllSelected}
          onChange={handleSelectAll}
          label={content.selectAllLabel}
          data-testid={`${dataTestId}.SelectAllCheckbox`}
        />
      </Group>
      <ScrollArea h={400} viewportRef={parentRef}>
        <Stack
          gap="xs"
          style={{
            position: "relative",
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map(({ index, start }) => (
            <SearchResult
              key={index}
              result={results[index]!}
              style={getVirtualStyles(start, isActiveSticky(index))}
              data-testid={`${dataTestId}.SearchResult.${index}`}
            />
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};
