export const promptLang = "en";

export const tags = {
  sourceLang: "{source_lang}",
  targetLang: "{target_lang}",
  batchAddition: "{batch_addition}",
} as const;

export const batchAddition = `You will receive JSON with lines of text. Respond ONLY with a valid JSON object, using exactly the same keys.`;
