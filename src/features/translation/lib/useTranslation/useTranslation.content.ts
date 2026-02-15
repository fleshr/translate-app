import { insert, t, type Dictionary } from "intlayer";

export default {
  key: "useTranslation",
  content: {
    startMessage: t({
      en: "Translation started",
      ru: "Перевод начат",
    }),
    stopMessage: t({
      en: "Translation stopped",
      ru: "Перевод остановлен",
    }),
    completeMessage: t({
      en: "Translation completed",
      ru: "Перевод завершен",
    }),
    errorMessage: t({
      en: "Translation error",
      ru: "Ошибка перевода",
    }),
    notFoundMessage: t({
      en: "Translator not found",
      ru: "Переводчик не найден",
    }),
    startSegmentMessage: t({
      en: insert("Original: {{text}}"),
      ru: insert("Оригинал: {{text}}"),
    }),
    completeSegmentMessage: t({
      en: insert("Translation: {{text}}"),
      ru: insert("Перевод: {{text}}"),
    }),
    alreadyTranslatingMessage: t({
      en: "Translation is already in progress",
      ru: "Перевод уже в процессе",
    }),
  },
} satisfies Dictionary;
