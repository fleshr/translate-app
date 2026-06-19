import { t, type Dictionary } from "intlayer";

export default {
  key: "TranslationLanguageSelector",
  content: {
    sourceLanguageTooltip: t({
      en: "Source language",
      ru: "Исходный язык",
    }),
    targetLanguageTooltip: t({
      en: "Target language",
      ru: "Целевой язык",
    }),
    swapLanguagesTooltip: t({
      en: "Swap languages",
      ru: "Поменять языки",
    }),
  },
} satisfies Dictionary;
