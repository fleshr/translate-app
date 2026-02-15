import { t, type Dictionary } from "intlayer";

export default {
  key: "SegmentEditForm",
  content: {
    originalTextLabel: t({
      en: "Original Text",
      ru: "Оригинальный текст",
    }),
    machineTranslationLabel: t({
      en: "Machine Translated",
      ru: "Машиный перевод",
    }),
    manualTranslationLabel: t({
      en: "Manual Translation",
      ru: "Ручной перевод",
    }),
  },
} satisfies Dictionary;
