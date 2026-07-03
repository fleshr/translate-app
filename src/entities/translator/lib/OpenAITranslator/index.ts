import type { Translator } from "../../model/translator";
import { configForm, type Config } from "./config";
import { translate } from "./translate";
import { translateBatch } from "./translateBatch";

export const OpenAITranslator = {
  name: "OpenAI Translator",
  version: "0.0.1",
  configForm,
  translate,
  translateBatch,
} satisfies Translator<Config>;
