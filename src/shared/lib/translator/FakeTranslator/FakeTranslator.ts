import { stringifyJson } from "@/shared/lib/json";
import type {
  Translator,
  TranslatorConfig,
  TranslatorOptions,
} from "@/shared/model/translator";
import { generate, type JsonSchema } from "json-schema-faker";

interface Config extends TranslatorConfig {
  delay: number;
}

const defaultConfig: Config = {
  delay: 3000,
};

export const FakeTranslator: Translator<Config> = {
  name: "Fake Translator",
  version: "0.0.1",

  configFields: [
    {
      key: "delay",
      type: "number",
      label: "Delay",
      initial: defaultConfig.delay,
    },
  ],

  async translate(
    text: string,
    options: TranslatorOptions<Config> = {},
  ): Promise<string> {
    const { config = defaultConfig, schema, signal } = options;
    const { delay } = config;

    return new Promise((resolve, reject) => {
      signal?.throwIfAborted();

      const timeoutId = setTimeout(() => {
        if (!schema) {
          return resolve(text);
        }

        void generate(
          schema.toJSONSchema({ target: "draft-2020-12" }) as JsonSchema,
          { minLength: 3 },
        ).then((fakeJson) => {
          resolve(stringifyJson(fakeJson));
        });
      }, delay);

      signal?.addEventListener(
        "abort",
        () => {
          clearTimeout(timeoutId);
          reject(new DOMException("Aborted", "AbortError"));
        },
        { once: true },
      );
    });
  },
};
