import { getLanguageLabel } from "@/shared/lib/intl";
import { parseJson, stringifyJson } from "@/shared/lib/json";
import type { LanguageCode } from "iso-639-1";
import { APIUserAbortError, OpenAI } from "openai";
import { fromEntries, fromKeys, map, pipe, times, values } from "remeda";
import { z } from "zod";
import type { Config } from "./config";

export const prepareInstructions = (
  source: LanguageCode,
  target: LanguageCode,
  config: Config,
) => {
  const { systemPrompt, promptLang } = config;

  return systemPrompt
    .replaceAll("{source_lang}", getLanguageLabel(source, promptLang, false))
    .replaceAll("{target_lang}", getLanguageLabel(target, promptLang, false));
};

export const getBatchSchema = (size: number) => {
  return z.object(
    pipe(
      size,
      times((i) => `Line${i + 1}`),
      fromKeys(() => z.string()),
    ),
  );
};

export const getBatchJson = (input: string[]) => {
  const batch = pipe(
    input,
    map((text, i) => [`Line${i + 1}`, text] as const),
    fromEntries(),
  );

  return stringifyJson(batch);
};

export const parseResponse = (
  response: string,
  schema: z.ZodObject<Record<string, z.ZodString>>,
) => {
  return values(schema.parse(parseJson(response)));
};

export const createClient = (config: Config) => {
  const { baseURL, apiKey } = config;
  return new OpenAI({ baseURL, apiKey, dangerouslyAllowBrowser: true });
};

export const abortWrapper = async <T>(
  callback: () => Promise<T>,
): Promise<T> => {
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
