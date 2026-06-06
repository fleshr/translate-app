import { t, type Dictionary } from "intlayer";

export default {
  key: "TranslationProgress",
  content: {
    resourcesProgressTitle: t({
      en: "Resources Progress",
      ru: "Прогресс ресурсов",
    }),
    segmentsProgressTitle: t({
      en: "Segments Progress",
      ru: "Прогресс сегментов",
    }),
  },
} satisfies Dictionary;
