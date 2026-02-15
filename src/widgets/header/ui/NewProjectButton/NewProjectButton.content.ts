import { t, type Dictionary } from "intlayer";

export default {
  key: "NewProjectButton",
  content: {
    tooltipLabel: t({
      en: "Create new project",
      ru: "Создать новый проект",
    }),
    modalTitle: t({
      en: "New project",
      ru: "Новый проект",
    }),
  },
} satisfies Dictionary;
