import { abortableDelayedResolve } from "@/shared/lib/async";
import { faker } from "@faker-js/faker";
import type { TranslatorOptions } from "../../model/translator";
import { defaultConfig, type Config } from "./config";

export const translateBatch = async (
  batch: string[],
  options: TranslatorOptions<Config>,
): Promise<string[]> => {
  const { config: { delay } = defaultConfig, signal } = options;
  const sentences = faker.helpers.multiple(
    () => faker.lorem.sentence({ min: 3, max: 5 }),
    { count: batch.length },
  );

  return abortableDelayedResolve(sentences, { delay, signal });
};
