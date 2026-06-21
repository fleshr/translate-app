import type { LanguageCode } from "iso-639-1";

const options: Intl.DisplayNamesOptions = {
  type: "language",
  languageDisplay: "standard",
  fallback: "none",
};

export const getLanguageLabel = (
  code: LanguageCode,
  locale: LanguageCode,
  includeNative = true,
): string => {
  const localeName = new Intl.DisplayNames([locale], options).of(code);
  const nativeName = new Intl.DisplayNames([code], options).of(code);

  if (!localeName || !nativeName) {
    return code;
  }

  return includeNative ? `${localeName} (${nativeName})` : localeName;
};
