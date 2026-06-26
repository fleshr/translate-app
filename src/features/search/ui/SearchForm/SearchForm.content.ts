import { t, type Dictionary } from "intlayer";

export default {
  key: "SearchForm",
  content: {
    searchLabel: t({
      en: "Search",
      ru: "Поиск",
    }),
    replaceLabel: t({
      en: "Replace",
      ru: "Замена",
    }),
    originalTextLabel: t({
      en: "Original Text",
      ru: "Оригинальный текст",
    }),
    machineTranslationLabel: t({
      en: "Machine Translated",
      ru: "Машиный перевод",
    }),
    manualTranslationLabel: t({
      en: "Manual Translation",
      ru: "Ручной перевод",
    }),
    caseSensitiveLabel: t({
      en: "Case sensitive",
      ru: "Чувствительно к регистру",
    }),
    findLabel: t({
      en: "Find",
      ru: "Найти",
    }),
  },
} satisfies Dictionary;
