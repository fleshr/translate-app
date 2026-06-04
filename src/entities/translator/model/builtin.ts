import { FakeTranslator } from "../lib/FakeTranslator";
import { OpenAITranslator } from "../lib/OpenAITranslator";
import type { Translator } from "./translator";

export const translators: Record<string, Translator> = {
  openai: OpenAITranslator,
  fake: FakeTranslator,
};
