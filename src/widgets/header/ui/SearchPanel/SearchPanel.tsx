import type { Id } from "@/shared/model/common";
import {
  setSessionSelectedResource,
  setSessionSelectedSegment,
} from "@/shared/model/sessionStore";
import type { TranslationResource } from "@/shared/model/translation";
import {
  replaceTranslationSegmentsField,
  selectResources,
  useTranslationStore,
} from "@/shared/model/translationStore";
import { ResultCard } from "@/shared/ui/ResultCard";
import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { flat, pipe, values } from "remeda";
import { getTranslationsSearchResults } from "../../lib/getTranslationsSearchResults/getTranslationsSearchResults";
import type { SearchOptions } from "../../model/search";
import type { SearchFormValues } from "../../model/searchForm";
import { SearchForm } from "../SearchForm/SearchForm";

export const SearchPanel = () => {
  const content = useIntlayer("SearchPanel");

  const [selectable, setSelectable] = useState(false);
  const [selected, setSelected] = useState<Record<Id, Id[]>>({});

  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    text: "",
    field: "originalText",
    caseSensitive: false,
  });

  const resources = useTranslationStore(selectResources);
  const results = getTranslationsSearchResults(resources, searchOptions);

  const handleFindClick = (formValues: SearchFormValues) => {
    const { searchText, field, caseSensitive } = formValues;

    setSelected({});
    setSearchOptions({ text: searchText, field, caseSensitive });
  };

  const handleReplaceClick = (formValues: SearchFormValues) => {
    const { replaceText, field } = formValues;
    const { text } = searchOptions;
    const segmentsIds = pipe(selected, values(), flat());

    setSelected({});
    replaceTranslationSegmentsField(segmentsIds, text, replaceText, field);
  };

  const handleFormChange = (formValues: SearchFormValues) => {
    const { replace } = formValues;
    setSelectable(replace);
  };

  const handleSelectSegment = (resourceId: Id) => (value: Id[]) => {
    setSelected((curr) => ({ ...curr, [resourceId]: value }));
  };

  const handleResultClick = (resourceId: Id) => (segmentId: Id) => {
    setSessionSelectedSegment(segmentId);
    setSessionSelectedResource(resourceId);
  };

  const renderResult = (resource: TranslationResource, index: number) => {
    const { id, name } = resource;
    const items = resource.segments.map((segment) => ({
      value: segment.id,
      label: segment[searchOptions.field],
    }));

    return (
      <ResultCard
        key={id}
        title={name}
        items={items}
        selected={selected[id]}
        selectable={selectable}
        highlight={searchOptions.text}
        onClick={handleResultClick(id)}
        onSelect={handleSelectSegment(id)}
        data-testid={`SearchPanel.ResultCard.${index}`}
      />
    );
  };

  return (
    <Stack data-testid="SearchPanel">
      <SearchForm
        onFindClick={handleFindClick}
        onFormChange={handleFormChange}
        onReplaceClick={handleReplaceClick}
      />
      <Divider />
      <Stack gap="xs">
        <Text>{content.resultsLabel}</Text>
        <ScrollArea h={400}>
          <Stack gap="xs">{results.map(renderResult)}</Stack>
        </ScrollArea>
      </Stack>
    </Stack>
  );
};
