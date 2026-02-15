import { t, type Dictionary } from "intlayer";

export default {
  key: "LogsContainer",
  content: {
    noLogsText: t({
      en: "No logs yet",
      ru: "Нет логов",
    }),
    noLogsSubtext: t({
      en: "The logs will appear here",
      ru: "Логи появятся здесь",
    }),
  },
} satisfies Dictionary;
