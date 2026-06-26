import { t, type Dictionary } from "intlayer";

export default {
  key: "SearchResults",
  content: {
    resultsLabel: t({
      en: "Results",
      ru: "Результаты",
    }),
    selectAllLabel: t({
      en: "Select all",
      ru: "Выбрать все",
    }),
  },
} satisfies Dictionary;
