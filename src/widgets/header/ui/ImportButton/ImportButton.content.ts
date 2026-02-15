import { t, type Dictionary } from "intlayer";

export default {
  key: "ImportButton",
  content: {
    tooltipLabel: t({
      en: "Import game files",
      ru: "Импортировать игровые файлы",
    }),
    successMessage: t({
      en: "Game files successfully imported",
      ru: "Игровые файлы успешно импортированы",
    }),
    parserNotFoundMessage: t({
      en: "Parser not found",
      ru: "Парсер не найден",
    }),
    errorMessage: t({
      en: "Failed to import files",
      ru: "Не удалось импортировать файлы",
    }),
  },
} satisfies Dictionary;
