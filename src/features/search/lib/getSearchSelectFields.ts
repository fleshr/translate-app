import type { ComboboxItem } from "@mantine/core";
import type { IntlayerNode } from "react-intlayer";
import type { SearchFormValues } from "../model/searchForm";

interface Content {
  originalTextLabel: IntlayerNode<string>;
  machineTranslationLabel: IntlayerNode<string>;
  manualTranslationLabel: IntlayerNode<string>;
}

export const getSearchSelectFields = (
  content: Content,
): ComboboxItem<SearchFormValues["searchField"]>[] => {
  return [
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
  ];
};
