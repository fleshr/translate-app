import { createMockFactory } from "@/shared/lib/testing";
import type { Translator } from "../model/translator";

const mockTranslator: Translator = {
  name: "Mock Translator",
  version: "0.0.1",
  configFields: [],
  translate: () => Promise.resolve(""),
};

export const getTranslatorMock = createMockFactory(mockTranslator);
