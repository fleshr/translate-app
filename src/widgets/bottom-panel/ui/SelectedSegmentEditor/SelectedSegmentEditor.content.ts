import { t, type Dictionary } from "intlayer";

export default {
  key: "SelectedSegmentEditor",
  content: {
    placeholderText: t({
      en: "No segment selected",
      ru: "Нет выбранного сегмента",
    }),
    placeholderSubtext: t({
      en: "Click on a segment in the table to edit",
      ru: "Нажмите на сегмент в таблице для редактирования",
    }),
  },
} satisfies Dictionary;
