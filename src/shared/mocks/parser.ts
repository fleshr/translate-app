import { createMockFactory } from "../lib/testing";
import type { Parser } from "../model/parser";

export const mockParser: Parser = {
  name: "Test Parser",
  version: "1.0.0",
  shortName: "test",
  checkFile: () => true,
  replaceText: () => new Uint8Array(),
  extractText: () => ({ content: "", segments: [] }),
};

export const getParserMock = createMockFactory(mockParser);
