import { t, type Dictionary } from "intlayer";

export default {
  key: "OpenProjectButton",
  content: {
    tooltipLabel: t({
      en: "Open project",
      ru: "Открыть проект",
    }),
    openedMessage: t({
      en: "Project opened",
      ru: "Проект открыт",
    }),
    errorMessage: t({
      en: "Failed to open project",
      ru: "Не удалось открыть проект",
    }),
  },
} satisfies Dictionary;
