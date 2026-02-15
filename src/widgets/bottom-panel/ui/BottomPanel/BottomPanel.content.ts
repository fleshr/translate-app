import { t, type Dictionary } from "intlayer";

export default {
  key: "BottomPanel",
  content: {
    logsTooltipLabel: t({
      en: "Logs",
      ru: "Логи",
    }),
    segmentTooltipLabel: t({
      en: "Selected segment",
      ru: "Выбранный сегмент",
    }),
    rawTooltipLabel: t({
      en: "Selected segment raw json",
      ru: "Выбранный сегмент в исходном формате",
    }),
  },
} satisfies Dictionary;
