import { zodTextFormat } from "openai/helpers/zod";
import type { TranslatorOptions } from "../../model/translator";
import { defaultConfig, type Config } from "./config";
import {
  abortWrapper,
  createClient,
  getBatchJson,
  getBatchSchema,
  parseResponse,
  prepareInstructions,
} from "./helpers";

export const translateBatch = async (
  input: string[],
  options: TranslatorOptions<Config>,
): Promise<string[]> => {
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
};
