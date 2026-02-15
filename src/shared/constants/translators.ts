import { FakeTranslator, OpenAITranslator } from "../lib/translator";
import type { Translator } from "../model/translator";

export const translators: Record<string, Translator> = {
  openai: OpenAITranslator,
  fake: FakeTranslator,
};
