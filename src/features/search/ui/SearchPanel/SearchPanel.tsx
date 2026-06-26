import type { BaseProps } from "@/shared/model/component";
import { Divider, Stack } from "@mantine/core";
import { SearchForm } from "../SearchForm/SearchForm";
import { SearchResults } from "../SearchResults/SearchResults";

export const SearchPanel = (props: BaseProps) => {
  const { "data-testid": dataTestId = "SearchPanel" } = props;

  return (
    <Stack data-testid={dataTestId}>
      <SearchForm data-testid={`${dataTestId}.SearchForm`} />
      <Divider />
      <SearchResults data-testid={`${dataTestId}.SearchResults`} />
    </Stack>
  );
};
