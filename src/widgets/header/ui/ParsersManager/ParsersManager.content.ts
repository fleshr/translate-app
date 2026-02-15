import { t, type Dictionary } from "intlayer";

export default {
  key: "ParsersManager",
  content: {
    listTitle: t({
      en: "Parsers",
      ru: "Парсеры",
    }),
    removeTooltip: t({
      en: "Remove parser",
      ru: "Удалить парсер",
    }),
    addParserLabel: t({
      en: "Add parser",
      ru: "Добавить парсер",
    }),
    downloadParsersLabel: t({
      en: "Download default parsers",
      ru: "Скачать стандартные парсеры",
    }),
    successMessage: t({
      en: "Parser successfully added",
      ru: "Парсер успешно добавлен",
    }),
    errorMessage: t({
      en: "Failed to add parser",
      ru: "Не удалось добавить парсер",
    }),
    removeMessage: t({
      en: "Parser removed",
      ru: "Парсер удален",
    }),
  },
} satisfies Dictionary;
