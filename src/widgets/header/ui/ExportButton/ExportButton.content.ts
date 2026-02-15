import { t, type Dictionary } from "intlayer";

export default {
  key: "ExportButton",
  content: {
    tooltipLabel: t({
      en: "Export game files",
      ru: "Экспортировать игровые файлы",
    }),
    successMessage: t({
      en: "Game files exported successfully",
      ru: "Игровые файлы экспортированы успешно",
    }),
    parserNotFoundMessage: t({
      en: "Parser not found",
      ru: "Парсер не найден",
    }),
    errorMessage: t({
      en: "Failed to export files",
      ru: "Не удалось экспортировать файлы",
    }),
  },
} satisfies Dictionary;
