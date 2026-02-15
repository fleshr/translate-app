import { t, type Dictionary } from "intlayer";

export default {
  key: "GeneralSettings",
  content: {
    themeSelectLabel: t({
      en: "Theme",
      ru: "Тема",
    }),
    themeLabels: {
      light: t({
        en: "Light",
        ru: "Светлая",
      }),
      dark: t({
        en: "Dark",
        ru: "Темная",
      }),
      auto: t({
        en: "System",
        ru: "Системная",
      }),
    },
    languageSelectLabel: t({
      en: "Language",
      ru: "Язык",
    }),
    languageLabels: {
      en: t({
        en: "English",
        ru: "Английский",
      }),
      ru: t({
        en: "Russian",
        ru: "Русский",
      }),
    },
    saveButtonLabel: t({
      en: "Save",
      ru: "Сохранить",
    }),
  },
} satisfies Dictionary;
