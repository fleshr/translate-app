import { t, type Dictionary } from "intlayer";

export default {
  key: "useTranslationProcess",
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
    alreadyTranslatingMessage: t({
      en: "Translation is already in progress",
      ru: "Перевод уже в процессе",
    }),
  },
} satisfies Dictionary;
