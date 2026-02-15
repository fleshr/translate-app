import { t, type Dictionary } from "intlayer";

export default {
  key: "TranslatorSettings",
  content: {
    translatorSelectLabel: t({
      en: "Translator",
      ru: "Переводчик",
    }),
    translatorSelectDescription: t({
      en: "Select translator to change configuration",
      ru: "Выберите переводчик для изменения конфигурации",
    }),
    saveButtonLabel: t({
      en: "Save",
      ru: "Сохранить",
    }),
  },
} satisfies Dictionary;
