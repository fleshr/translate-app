import { t, type Dictionary } from "intlayer";

export default {
  key: "TranslationControl",
  content: {
    translateLabel: t({
      en: "Translate",
      ru: "Перевести",
    }),
    stopLabel: t({
      en: "Stop",
      ru: "Остановить",
    }),
    totalProgressTitle: t({
      en: "Resources Progress",
      ru: "Прогресс ресурсов",
    }),
    resourceProgressTitle: t({
      en: "Segments Progress",
      ru: "Прогресс сегментов",
    }),
  },
} satisfies Dictionary;
