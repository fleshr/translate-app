import {
  getTranslationCommonMock,
  getTranslationFileMock,
  getTranslationFileOccurrenceMock,
  getTranslationSegmentMock,
} from "@/shared/mocks/translation";
import type { Parser } from "@/shared/model/parser";
import type { TranslationResource } from "@/shared/model/translation";
import JSZip from "jszip";
import { describe, expect, it, vi } from "vitest";
import { exportTranslationToZip } from "./exportTranslationToZip";

const testResources: TranslationResource[] = [
  getTranslationFileMock({
    id: "file-1",
    relPath: "files/file-1",
    content: "content-1",
    segments: [
      getTranslationSegmentMock({
        originalText: "original-1",
        machineTranslation: "translated-1",
        fileOccurrences: { "file-1": [getTranslationFileOccurrenceMock()] },
      }),
    ],
  }),
  getTranslationFileMock({
    id: "file-2",
    relPath: "files/file-2",
    content: "content-2",
    segments: [
      getTranslationSegmentMock({
        originalText: "original-2",
        machineTranslation: "translated-2",
        fileOccurrences: { "file-2": [getTranslationFileOccurrenceMock()] },
      }),
    ],
  }),
  getTranslationCommonMock({
    id: "common-3",
    segments: [
      getTranslationSegmentMock({
        originalText: "original-3",
        machineTranslation: "translated-3",
        fileOccurrences: { "file-1": [getTranslationFileOccurrenceMock()] },
      }),
    ],
  }),
];

const mockParser: Parser = {
  name: "Mock Parser",
  version: "1.0.0",
  shortName: "mock",
  checkFile: vi.fn(() => true),
  replaceText: vi.fn(() => new Uint8Array()),
  extractText: vi.fn(() => ({ content: "", segments: [] })),
};

describe("widgets/header/lib/exportTranslationToZip", () => {
  it("should return a zip with files", async () => {
    const blob = await exportTranslationToZip(testResources, mockParser);

    const zip = new JSZip();
    const { files } = await zip.loadAsync(blob);

    expect(files).toHaveProperty("files/file-1");
    expect(files).toHaveProperty("files/file-2");
  });

  it("should call parser replaceText", async () => {
    await exportTranslationToZip(testResources, mockParser);

    expect(mockParser.replaceText).toHaveBeenCalledTimes(2);
    expect(mockParser.replaceText).toHaveBeenCalledWith("content-1", [
      {
        original: "original-1",
        translation: "translated-1",
        position: { start: 0, end: 10 },
        metadata: {},
      },
      {
        original: "original-3",
        translation: "translated-3",
        position: { start: 0, end: 10 },
        metadata: {},
      },
    ]);
    expect(mockParser.replaceText).toHaveBeenCalledWith("content-2", [
      {
        original: "original-2",
        translation: "translated-2",
        position: { start: 0, end: 10 },
        metadata: {},
      },
    ]);
  });
});
