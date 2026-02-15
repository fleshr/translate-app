import { t, type Dictionary } from "intlayer";

export default {
  key: "CreateProjectForm",
  content: {
    parserSelectLabel: t({
      en: "Parser",
      ru: "Парсер",
    }),
    parserSelectPlaceholder: t({
      en: "Select parser",
      ru: "Выберите парсер",
    }),
    cancelButtonLabel: t({
      en: "Cancel",
      ru: "Отменить",
    }),
    createButtonLabel: t({
      en: "Create",
      ru: "Создать",
    }),
    createdNotification: t({
      en: "Project created",
      ru: "Проект создан",
    }),
  },
} satisfies Dictionary;
