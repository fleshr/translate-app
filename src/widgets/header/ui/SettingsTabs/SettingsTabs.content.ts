import { t, type Dictionary } from "intlayer";

export default {
  key: "SettingsTabs",
  content: {
    generalTabLabel: t({
      en: "General",
      ru: "Общие",
    }),
    translatorTabLabel: t({
      en: "Translator",
      ru: "Переводчик",
    }),
    parsersTabLabel: t({
      en: "Parsers",
      ru: "Парсеры",
    }),
  },
} satisfies Dictionary;
