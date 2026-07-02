import { getParserMock } from "@/entities/parser/mocks";
import type { TranslationResource } from "@/entities/translation";
import {
  getTranslationCommonMock,
  getTranslationFileMock,
  getTranslationFileOccurrenceMock,
  getTranslationSegmentMock,
} from "@/entities/translation/mocks";
import { loadAsync } from "jszip";
import { describe, expect, it, vi } from "vitest";
import { exportResourcesToZip } from "./exportResourcesToZip";

const testResources: TranslationResource[] = [
  getTranslationFileMock({
    id: "file-1",
    relPath: "files/file-1",
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

const testFiles = {
  "files/file-1": new TextEncoder().encode("content-1"),
  "files/file-2": new TextEncoder().encode("content-2"),
};

const mockParser = vi.mockObject(getParserMock());

describe("widgets/header/lib/exportResourcesToZip", () => {
  it("should throw error if resource file not found", async () => {
    const promise = exportResourcesToZip(testResources, {}, mockParser);

    await expect(promise).rejects.toThrow("Resource file not found");
  });

  it("should return a zip with files", async () => {
    const blob = await exportResourcesToZip(
      testResources,
      testFiles,
      mockParser,
    );

    const { files } = await loadAsync(blob);
    expect(files).toHaveProperty("files/file-1");
    expect(files).toHaveProperty("files/file-2");
  });

  it("should call parser replaceText", async () => {
    await exportResourcesToZip(testResources, testFiles, mockParser);

    expect(mockParser.replaceText).toHaveBeenCalledTimes(2);
    expect(mockParser.replaceText).toHaveBeenCalledWith(
      testFiles["files/file-1"],
      [
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
      ],
    );
    expect(mockParser.replaceText).toHaveBeenCalledWith(
      testFiles["files/file-2"],
      [
        {
          original: "original-2",
          translation: "translated-2",
          position: { start: 0, end: 10 },
          metadata: {},
        },
      ],
    );
  });
});
