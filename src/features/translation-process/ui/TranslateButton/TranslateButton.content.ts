import { t, type Dictionary } from "intlayer";

export default {
  key: "TranslateButton",
  content: {
    translateLabel: t({
      en: "Translate",
      ru: "Перевести",
    }),
    stopLabel: t({
      en: "Stop",
      ru: "Остановить",
    }),
  },
} satisfies Dictionary;
