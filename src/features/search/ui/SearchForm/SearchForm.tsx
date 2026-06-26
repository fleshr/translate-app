import { replaceTranslationSegmentsField } from "@/entities/translation";
import type { BaseProps } from "@/shared/model/component";
import {
  Button,
  Checkbox,
  Group,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useIntlayer } from "react-intlayer";
import { getSearchSelectFields } from "../../lib/getSearchSelectFields";
import {
  SearchFormSchema,
  type SearchFormValues,
} from "../../model/searchForm";
import {
  setFormValues,
  setReplaceSelected,
} from "../../model/searchStore/actions";
import {
  selectFormValues,
  selectReplaceSelected,
} from "../../model/searchStore/selectors";
import { useSearchStore } from "../../model/searchStore/store";

export const SearchForm = (props: BaseProps) => {
  const { "data-testid": dataTestId = "SearchForm" } = props;
  const content = useIntlayer("SearchForm");
  const fields = getSearchSelectFields(content);
  const initialValues = useSearchStore(selectFormValues);

  const form = useForm<SearchFormValues>({
    initialValues,
    validate: schemaResolver(SearchFormSchema, { sync: true }),
    onValuesChange: ({ replaceText }) => {
      setFormValues({ replaceText });
    },
  });

  const handleFindClick = () => {
    setFormValues(form.getValues());
    setReplaceSelected([]);
  };

  const handleReplaceClick = () => {
    const { searchText, replaceText, searchField } = selectFormValues(
      useSearchStore.getState(),
    );
    const segmentsIds = selectReplaceSelected(useSearchStore.getState());

    setReplaceSelected([]);
    replaceTranslationSegmentsField(
      segmentsIds,
      searchText,
      replaceText,
      searchField,
    );
  };

  return (
    <form data-testid={dataTestId}>
      <Stack>
        <TextInput
          label={content.searchLabel}
          key={form.key("searchText")}
          {...form.getInputProps("searchText")}
          data-testid={`${dataTestId}.SearchInput`}
        />
        <TextInput
          label={content.replaceLabel}
          key={form.key("replaceText")}
          {...form.getInputProps("replaceText")}
          data-testid={`${dataTestId}.ReplaceInput`}
        />
        <Group justify="space-between">
          <Group>
            <Select
              size="xs"
              data={fields}
              key={form.key("searchField")}
              {...form.getInputProps("searchField")}
              data-testid={`${dataTestId}.FieldSelect`}
            />
            <Checkbox
              disabled
              label={content.caseSensitiveLabel}
              key={form.key("caseSensitive")}
              {...form.getInputProps("caseSensitive")}
              data-testid={`${dataTestId}.CaseSensitiveCheckbox`}
            />
          </Group>
          <Group>
            <Button
              variant="outline"
              onClick={handleFindClick}
              data-testid={`${dataTestId}.FindButton`}
            >
              {content.findLabel}
            </Button>
            <Button
              onClick={handleReplaceClick}
              data-testid={`${dataTestId}.ReplaceButton`}
            >
              {content.replaceLabel}
            </Button>
          </Group>
        </Group>
      </Stack>
    </form>
  );
};
