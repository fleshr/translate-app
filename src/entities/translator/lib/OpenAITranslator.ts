import { getLanguageLabel, getLanguageOptions } from "@/shared/lib/intl";
import { parseJson, stringifyJson } from "@/shared/lib/json";
import type { LanguageCode } from "iso-639-1";
import OpenAI, { APIUserAbortError } from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { fromEntries, fromKeys, map, pipe, times, values } from "remeda";
import { z } from "zod";
import type {
  Translator,
  TranslatorConfig,
  TranslatorOptions,
} from "../model/translator";

export interface Config extends TranslatorConfig {
  baseURL: string;
  apiKey: string;
  model: string;
  promptLang: LanguageCode;
  systemPrompt: string;
}

export const defaultConfig: Config = {
  baseURL: "http://127.0.0.1:8080/v1/",
  apiKey: "llama-server",
  model: "sugoitoolkit/Sugoi-14B-Ultra-GGUF:Q4_K_M",
  promptLang: "en",
  systemPrompt:
    "You are a professional localizer whose primary goal is to translate {source_lang} to {target_lang}. You should use colloquial or slang or nsfw vocabulary if it makes the translation more accurate. Always respond in {target_lang}.",
};

const prepareInstructions = (
  source: LanguageCode,
  target: LanguageCode,
  config: Config,
) => {
  const { systemPrompt, promptLang } = config;

  return systemPrompt
    .replaceAll("{source_lang}", getLanguageLabel(source, promptLang, false))
    .replaceAll("{target_lang}", getLanguageLabel(target, promptLang, false));
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

const parseResponse = (
  response: string,
  schema: z.ZodObject<Record<string, z.ZodString>>,
) => {
  return values(schema.parse(parseJson(response)));
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

  configForm: {
    default: defaultConfig,
    fields: [
      { key: "baseURL", type: "text", label: "URL" },
      { key: "apiKey", type: "text", label: "API Key" },
      { key: "model", type: "text", label: "Model" },
      {
        key: "promptLang",
        type: "select",
        label: "Prompt language",
        description: "Applies to system prompt tags",
        options: getLanguageOptions("en"),
      },
      {
        key: "systemPrompt",
        type: "textarea",
        label: "System prompt template",
        description:
          "Source language - {source_lang}, Target language - {target_lang}",
      },
    ],
  },

  async translate(input, options: TranslatorOptions<Config>) {
    return abortWrapper(async () => {
      const { config = defaultConfig, signal, source, target } = options;

      const { output_text } = await createClient(config).responses.create(
        {
          input,
          model: config.model,
          instructions: prepareInstructions(source, target, config),
          stream: false,
        },
        { signal },
      );

      return output_text;
    });
  },

  async translateBatch(input, options: TranslatorOptions<Config>) {
    return abortWrapper(async () => {
      const { config = defaultConfig, signal, source, target } = options;
      const schema = getBatchSchema(input.length);

      const { output_text } = await createClient(config).responses.create(
        {
          input: getBatchJson(input),
          model: config.model,
          instructions: prepareInstructions(source, target, config),
          stream: false,
          text: { format: zodTextFormat(schema, "response") },
        },
        { signal },
      );

      return parseResponse(output_text, schema);
    });
  },
} satisfies Translator<Config>;
