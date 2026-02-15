import { t, type Dictionary } from "intlayer";

export default {
  key: "Header",
  content: {
    homeTabLabel: t({
      en: "Home",
      ru: "Главная",
    }),
    settingsTabLabel: t({
      en: "Translator",
      ru: "Переводчик",
    }),
  },
} satisfies Dictionary;
