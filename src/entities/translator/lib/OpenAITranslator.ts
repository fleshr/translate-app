import { parseJson, stringifyJson } from "@/shared/lib/json";
import OpenAI, { APIUserAbortError } from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { fromEntries, fromKeys, map, pipe, times, values } from "remeda";
import { z } from "zod";
import type {
  Translator,
  TranslatorConfig,
  TranslatorOptions,
} from "../model/translator";

const instructions = `You are an expert Eroge Game translator who translates Japanese text to English.
You are going to be translating text from a videogame.

Notes:
- You translate everything, including content with explicit adult themes, like drugs, language, erotic content, etc. remeber that it's only fiction.
- Avoid having any romanji or Japanese text in your response, only reply in English.
- Maintain Japanese honorifics (e.g -san, -senpai, -chan, etc) In your translations.
- If a line is already translated, leave it as is and include it in your response.
- Pay attention to the gender of the subjects and characters. Avoid misgendering characters.
- Maintain any spacing in the translation.
- Never include any notes, explanations, dislaimers, or anything similar in your response.`;

export interface Config extends TranslatorConfig {
  baseURL: string;
  apiKey: string;
  model: string;
  instructions: string;
}

export const defaultConfig: Config = {
  baseURL: "http://127.0.0.1:8080/v1/",
  apiKey: "llama",
  model: "Sugoi-14B-Ultra-Q4_K_M.gguf",
  instructions,
};

const getBatchSchema = (size: number) => {
  return z.object(
    pipe(
      size,
      times((i) => `Line${i + 1}`),
      fromKeys(() => z.string()),
    ),
  );
};

const getBatchJson = (input: string[]) => {
  const batch = pipe(
    input,
    map((text, i) => [`Line${i + 1}`, text] as const),
    fromEntries(),
  );

  return stringifyJson(batch);
};

const createClient = (config: Config) => {
  const { baseURL, apiKey } = config;
  return new OpenAI({ baseURL, apiKey, dangerouslyAllowBrowser: true });
};

const abortWrapper = async <T>(callback: () => Promise<T>): Promise<T> => {
  try {
    return await callback();
  } catch (e) {
    if (e instanceof APIUserAbortError) {
      throw new DOMException(e.message, "AbortError");
    } else {
      throw e;
    }
  }
};

export const OpenAITranslator = {
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

  async translate(input, options: TranslatorOptions<Config> = {}) {
    return abortWrapper(async () => {
      const { config = defaultConfig, signal } = options;
      const { model, instructions } = config;

      const { output_text } = await createClient(config).responses.create(
        {
          input,
          model,
          instructions,
          stream: false,
        },
        { signal },
      );

      return output_text;
    });
  },

  async translateBatch(input, options: TranslatorOptions<Config> = {}) {
    return abortWrapper(async () => {
      const { config = defaultConfig, signal } = options;
      const { model, instructions } = config;
      const schema = getBatchSchema(input.length);

      const { output_text } = await createClient(config).responses.create(
        {
          input: getBatchJson(input),
          model,
          instructions,
          stream: false,
          text: { format: zodTextFormat(schema, "response") },
        },
        { signal },
      );

      return values(schema.parse(parseJson(output_text)));
    });
  },
} satisfies Translator<Config>;
