import type { ComboboxItem } from "@mantine/core";
import ISO6391, { type LanguageCode } from "iso-639-1";
import { getLanguageLabel } from "./getLanguageLabel";

export const getLanguageOptions = (
  locale: LanguageCode,
  includeNative = true,
): ComboboxItem<LanguageCode>[] => {
  return ISO6391.getAllCodes().map((code) => ({
    label: getLanguageLabel(code, locale, includeNative),
    value: code,
  }));
};
