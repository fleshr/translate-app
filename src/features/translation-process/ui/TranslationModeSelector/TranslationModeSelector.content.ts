import { t, type Dictionary } from "intlayer";

export default {
  key: "TranslationModeSelector",
  content: {
    buttonTooltip: t({
      en: "Translation mode",
      ru: "Режим перевода",
    }),
    menuLabel: t({
      en: "Translation mode",
      ru: "Режим перевода",
    }),
    sequentialMode: t({
      en: "Sequential",
      ru: "Последовательный",
    }),
    batchMode: t({
      en: "Batch",
      ru: "Пакетный",
    }),
  },
} satisfies Dictionary;
