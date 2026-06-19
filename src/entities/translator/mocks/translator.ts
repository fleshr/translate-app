import { createMockFactory } from "@/shared/lib/testing";
import type { Translator } from "../model/translator";

const mockTranslator: Translator = {
  name: "Mock Translator",
  version: "0.0.1",
  translate: () => Promise.resolve("test"),
  translateBatch: () => Promise.resolve(["test"]),
};

export const getTranslatorMock = createMockFactory(mockTranslator);
