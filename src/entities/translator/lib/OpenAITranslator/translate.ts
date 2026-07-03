import type { TranslatorOptions } from "../../model/translator";
import type { Config } from "./config";
import { defaultConfig } from "./config";
import { abortWrapper, createClient, prepareInstructions } from "./helpers";

export const translate = async (
  input: string,
  options: TranslatorOptions<Config>,
): Promise<string> => {
  return abortWrapper(async () => {
    const { config = defaultConfig, signal, source, target } = options;
    const { model, systemPrompt } = config;

    const instructions = prepareInstructions(systemPrompt, {
      source,
      target,
      isBatch: false,
    });

    const { output_text } = await createClient(config).responses.create(
      { input, model, instructions, stream: false },
      { signal },
    );

    return output_text;
  });
};
