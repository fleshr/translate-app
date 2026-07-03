import { abortableDelayedResolve } from "@/shared/lib/async";
import { faker } from "@faker-js/faker";
import type { TranslatorOptions } from "../../model/translator";
import { defaultConfig, type Config } from "./config";

export const translate = async (
  _: string,
  options: TranslatorOptions<Config>,
): Promise<string> => {
  const { config: { delay } = defaultConfig, signal } = options;
  const text = faker.lorem.sentence({ min: 3, max: 5 });

  return abortableDelayedResolve(text, { delay, signal });
};
