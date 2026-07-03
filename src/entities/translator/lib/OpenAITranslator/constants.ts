export const promptLang = "en";

export const tags = {
  sourceLang: "{source_lang}",
  targetLang: "{target_lang}",
  batchAddition: "{batch_addition}",
} as const;

export const batchAddition =
  "I will give you lines of text in the JSON format. Respond with a translated JSON only.";
