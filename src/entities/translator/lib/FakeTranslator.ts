import { abortableDelayedResolve } from "@/shared/lib/async";
import { faker } from "@faker-js/faker";
import type {
  Translator,
  TranslatorConfig,
  TranslatorOptions,
} from "../model/translator";

interface Config extends TranslatorConfig {
  delay: number;
}

const defaultConfig: Config = {
  delay: 3000,
};

export const FakeTranslator = {
  name: "Fake Translator",
  version: "0.0.1",

  configForm: {
    default: defaultConfig,
    fields: [{ key: "delay", type: "number", label: "Delay" }],
  },

  async translate(_, options: TranslatorOptions<Config> = {}) {
    const { config: { delay } = defaultConfig, signal } = options;
    const text = faker.lorem.sentence({ min: 3, max: 5 });

    return abortableDelayedResolve(text, { delay, signal });
  },

  async translateBatch(batch, options: TranslatorOptions<Config> = {}) {
    const { config: { delay } = defaultConfig, signal } = options;
    const sentences = faker.helpers.multiple(
      () => faker.lorem.sentence({ min: 3, max: 5 }),
      { count: batch.length },
    );

    return abortableDelayedResolve(sentences, { delay, signal });
  },
} satisfies Translator<Config>;
