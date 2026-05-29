import {
  Button,
  Checkbox,
  Group,
  Select,
  Stack,
  TextInput,
  type ComboboxItem,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useIntlayer } from "react-intlayer";
import {
  SearchFormSchema,
  type SearchFormValues,
} from "../../model/searchForm";

interface SearchFormProps {
  onFormChange?: (values: SearchFormValues, previous: SearchFormValues) => void;
  onFindClick?: (values: SearchFormValues) => void;
  onReplaceClick?: (values: SearchFormValues) => void;
}

export const SearchForm = (props: SearchFormProps) => {
  const { onFormChange, onFindClick, onReplaceClick } = props;
  const content = useIntlayer("SearchForm");

  const fields = [
    {
      value: "originalText",
      label: content.originalTextLabel.value,
    },
    {
      value: "machineTranslation",
      label: content.machineTranslationLabel.value,
    },
    {
      value: "manualTranslation",
      label: content.manualTranslationLabel.value,
    },
  ] satisfies (ComboboxItem & { value: SearchFormValues["field"] })[];

  const form = useForm<SearchFormValues>({
    onValuesChange: onFormChange,
    validate: schemaResolver(SearchFormSchema, { sync: true }),
    initialValues: {
      searchText: "",
      replaceText: "",
      field: "originalText",
      replace: false,
      caseSensitive: true,
    },
  });

  const handleFindClick = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      onFindClick?.(form.getValues());
    }
  };

  const handleReplaceClick = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      onReplaceClick?.(form.getValues());
    }
  };

  return (
    <form data-testid="SearchForm">
      <Stack>
        <TextInput
          label={content.searchLabel}
          key={form.key("searchText")}
          {...form.getInputProps("searchText")}
          data-testid="SearchForm.SearchInput"
        />
        {form.values.replace && (
          <TextInput
            label={content.replaceLabel}
            key={form.key("replaceText")}
            {...form.getInputProps("replaceText")}
            data-testid="SearchForm.ReplaceInput"
          />
        )}
        <Group justify="space-between">
          <Group>
            <Select
              size="xs"
              data={fields}
              key={form.key("field")}
              {...form.getInputProps("field")}
              data-testid="SearchForm.FieldSelect"
            />
            <Checkbox
              label={content.replaceLabel}
              key={form.key("replace")}
              {...form.getInputProps("replace")}
              data-testid="SearchForm.ReplaceCheckbox"
            />
            <Checkbox
              disabled
              label={content.caseSensitiveLabel}
              key={form.key("caseSensitive")}
              {...form.getInputProps("caseSensitive")}
            />
          </Group>
          <Group>
            <Button
              onClick={handleFindClick}
              variant={form.values.replace ? "outline" : "filled"}
              data-testid="SearchForm.FindButton"
            >
              {content.findLabel}
            </Button>
            {form.values.replace && (
              <Button
                onClick={handleReplaceClick}
                data-testid="SearchForm.ReplaceButton"
              >
                {content.replaceLabel}
              </Button>
            )}
          </Group>
        </Group>
      </Stack>
    </form>
  );
};
