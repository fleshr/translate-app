import { t, type Dictionary } from "intlayer";

export default {
  key: "SaveProjectButton",
  content: {
    tooltipLabel: t({
      en: "Save project",
      ru: "Сохранить проект",
    }),
    savedMessage: t({
      en: "Project saved",
      ru: "Проект сохранен",
    }),
    errorMessage: t({
      en: "Failed to save project",
      ru: "Не удалось сохранить проект",
    }),
  },
} satisfies Dictionary;
