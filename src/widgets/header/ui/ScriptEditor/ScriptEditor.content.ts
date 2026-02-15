import { t, type Dictionary } from "intlayer";

export default {
  key: "ScriptEditor",
  content: {
    openedMessage: t({
      en: "Script opened",
      ru: "Скрипт открыт",
    }),
    savedMessage: t({
      en: "Script saved",
      ru: "Скрипт сохранен",
    }),
    executedMessage: t({
      en: "Script executed",
      ru: "Скрипт выполнен",
    }),
    errorMessage: t({
      en: "Script execution error",
      ru: "Ошибка выполнения скрипта",
    }),
  },
} satisfies Dictionary;
