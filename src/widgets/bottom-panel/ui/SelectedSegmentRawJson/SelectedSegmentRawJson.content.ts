import { t, type Dictionary } from "intlayer";

export default {
  key: "SelectedSegmentRawJson",
  content: {
    placeholderText: t({
      en: "No segment selected",
      ru: "Нет выбранного сегмента",
    }),
    placeholderSubtext: t({
      en: "Click on a segment in the table to view",
      ru: "Нажмите на сегмент в таблице для просмотра",
    }),
  },
} satisfies Dictionary;
