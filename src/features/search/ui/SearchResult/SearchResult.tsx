import type { BaseProps } from "@/shared/model/component";
import type { MantineStyleProp } from "@mantine/core";
import type { SearchResult as SearchResultType } from "../../model/searchResult";
import { ResultHeader } from "../ResultHeader/ResultHeader";
import { ResultSelect } from "../ResultSelect/ResultSelect";

interface SearchResultProps extends BaseProps {
  result: SearchResultType;
  style?: MantineStyleProp;
}

export const SearchResult = (props: SearchResultProps) => {
  const { result, ...restProps } = props;

  return result.type === "header" ? (
    <ResultHeader result={result} {...restProps} />
  ) : (
    <ResultSelect result={result} {...restProps} />
  );
};
