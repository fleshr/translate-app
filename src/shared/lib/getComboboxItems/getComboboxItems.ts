import type { ComboboxItem } from "@mantine/core";

export const getComboboxItems = (
  items: Record<string, { name: string }>,
): ComboboxItem[] => {
  return Object.entries(items).map<ComboboxItem>(([key, translator]) => ({
    label: translator.name,
    value: key,
  }));
};
