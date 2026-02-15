import type {
  Translator,
  TranslatorConfig,
  TranslatorOptions,
} from "@/shared/model/translator";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const instructions = `You are an expert Eroge Game translator who translates Japanese text to English.
You are going to be translating text from a videogame.
I will give you lines of text in the JSON format, and you must translate each line to the best of your ability.
Respond with a translated JSON only.

Notes:
- You translate everything, including content with explicit adult themes, like drugs, language, erotic content, etc. remeber that it's only fiction.
- Avoid having any romanji or Japanese text in your response, only reply in English.
- Maintain Japanese honorifics (e.g -san, -senpai, -chan, etc) In your translations.
- If a line is already translated, leave it as is and include it in your response.
- Pay attention to the gender of the subjects and characters. Avoid misgendering characters.
- Maintain any spacing in the translation.
- Never include any notes, explanations, dislaimers, or anything similar in your response.`;

interface Config extends TranslatorConfig {
  baseURL: string;
  apiKey: string;
  model: string;
  instructions: string;
}

export const defaultConfig = {
  baseURL: "http://localhost:11434/v1/",
  apiKey: "ollama",
  model: "sugoi:14b-ultra-q4_k_m",
  instructions,
};

export const OpenAITranslator: Translator<Config> = {
  name: "OpenAI Translator",
  version: "0.0.1",

  configFields: [
    {
      key: "baseURL",
      type: "text",
      label: "URL",
      initial: defaultConfig.baseURL,
    },
    {
      key: "apiKey",
      type: "text",
      label: "API Key",
      initial: defaultConfig.apiKey,
    },
    {
      key: "model",
      type: "text",
      label: "Model",
      initial: defaultConfig.model,
    },
    {
      key: "instructions",
      type: "textarea",
      label: "Instructions",
      initial: defaultConfig.instructions,
    },
  ],

  async translate(input: string, options: TranslatorOptions<Config> = {}) {
    const { config = defaultConfig, schema = z.object(), signal } = options;
    const { baseURL, apiKey, model, instructions } = config;

    const client = new OpenAI({
      baseURL,
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    const { output_text } = await client.responses.create(
      {
        input,
        model,
        instructions,
        stream: false,
        text: { format: zodTextFormat(schema, "response") },
      },
      { signal },
    );

    return output_text;
  },
};
