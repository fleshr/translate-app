import { t, type Dictionary } from "intlayer";

export default {
  key: "EditorToolbar",
  content: {
    openLabel: t({
      en: "Open script",
      ru: "Открыть скрипт",
    }),
    openMessage: t({
      en: "Script opened",
      ru: "Скрипт открыт",
    }),
    openErrorMessage: t({
      en: "Failed to open script",
      ru: "Не удалось открыть скрипт",
    }),
    saveLabel: t({
      en: "Save script",
      ru: "Сохранить скрипт",
    }),
    saveMessage: t({
      en: "Script saved",
      ru: "Скрипт сохранен",
    }),
    saveErrorMessage: t({
      en: "Failed to save script",
      ru: "Не удалось сохранить скрипт",
    }),
    executeLabel: t({
      en: "Execute script",
      ru: "Выполнить скрипт",
    }),
    executeMessage: t({
      en: "Script executed",
      ru: "Скрипт выполнен",
    }),
    executeErrorMessage: t({
      en: "Script execution error",
      ru: "Ошибка выполнения скрипта",
    }),
    debugLabel: t({
      en: "Debug script",
      ru: "Отладка скрипта",
    }),
  },
} satisfies Dictionary;
