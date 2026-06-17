import type { DeclaredLocales } from "intlayer";
import type { LanguageCode } from "iso-639-1";

const options: Intl.DisplayNamesOptions = {
  type: "language",
  languageDisplay: "standard",
};

export const getLanguageLabel = (
  code: LanguageCode,
  locale: DeclaredLocales,
) => {
  const languagesInLocale = new Intl.DisplayNames([locale], options);
  const languagesInOriginal = new Intl.DisplayNames([code], options);

  return `${languagesInLocale.of(code)} (${languagesInOriginal.of(code)})`;
};
