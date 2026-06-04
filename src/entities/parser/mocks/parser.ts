import { createMockFactory } from "@/shared/lib/testing";
import type { Parser } from "../model/parser/types";

const mockParser: Parser = {
  name: "Test Parser",
  version: "1.0.0",
  shortName: "test",
  checkFile: () => true,
  replaceText: () => new Uint8Array(),
  extractText: () => ({ content: "", segments: [] }),
};

export const getParserMock = createMockFactory(mockParser);
