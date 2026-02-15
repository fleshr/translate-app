import type { Parser } from "@/shared/model/parser";
import { nanoid } from "nanoid";
import { afterEach, describe, expect, it, vi } from "vitest";
import { extractTranslations } from "./extractTranslations";

vi.mock("../readFile", () => ({
  readFile: vi.fn(() => Promise.resolve(new Uint8Array())),
}));

let idPrefix = 1;
vi.mocked(nanoid).mockImplementation(() => `id-${idPrefix++}`);

const mockedParser = vi.mocked<Parser>({
  name: "Mock Parser",
  version: "1.0.0",
  shortName: "mock",
  checkFile: vi.fn(() => true),
  replaceText: vi.fn(() => new Uint8Array()),
  extractText: vi.fn(() => ({
    content: "test",
    segments: [
      {
        text: "test",
        type: "file" as const,
        position: { start: 0, end: 0 },
      },
    ],
  })),
});

const testFile = new File([""], "file.txt");
// @ts-expect-error dont exist in test but exists in browser
testFile.webkitRelativePath = "test/file.txt";

describe("widgets/header/lib/extractTranslations", () => {
  afterEach(() => {
    idPrefix = 1;
  });

  it("should return an empty array if no files are provided", async () => {
    const files = await extractTranslations([], mockedParser);
    expect(files).toEqual([]);
  });

  it("should return an empty array if no supported files are provided", async () => {
    mockedParser.checkFile.mockReturnValueOnce(false);
    const files = await extractTranslations([testFile], mockedParser);
    expect(files).toEqual([]);
  });

  it("should return an empty array if no segments are extracted", async () => {
    mockedParser.extractText.mockReturnValueOnce({ content: "", segments: [] });
    const files = await extractTranslations([testFile], mockedParser);
    expect(files).toEqual([]);
  });

  it("should dedulicate segments in files", async () => {
    mockedParser.extractText.mockReturnValueOnce({
      content: "test",
      segments: [
        {
          text: "test",
          type: "file",
          position: { start: 0, end: 0 },
        },
        {
          text: "test",
          type: "file",
          position: { start: 1, end: 1 },
        },
      ],
    });
    const files = await extractTranslations([testFile], mockedParser);
    expect(files).toEqual([
      {
        id: "id-1",
        type: "file",
        name: "file.txt",
        relPath: "test/file.txt",
        content: "test",
        segments: [
          {
            id: "id-2",
            resourceId: "id-1",
            originalText: "test",
            machineTranslation: "",
            manualTranslation: "",
            fileOccurrences: {
              "id-1": [
                { metadata: {}, position: { start: 0, end: 0 } },
                { metadata: {}, position: { start: 1, end: 1 } },
              ],
            },
          },
        ],
      },
    ]);
  });

  it("should extract common segments", async () => {
    mockedParser.extractText.mockReturnValueOnce({
      content: "test",
      segments: [
        {
          text: "test1",
          type: "file",
          position: { start: 0, end: 0 },
        },
        {
          text: "test2",
          type: "common",
          key: "names",
          path: "*",
          position: { start: 1, end: 1 },
        },
      ],
    });
    const files = await extractTranslations([testFile], mockedParser);
    expect(files).toEqual([
      {
        id: "id-2",
        type: "common",
        name: "Common: names",
        relPath: "*",
        segments: [
          {
            id: "id-3",
            resourceId: "id-2",
            originalText: "test2",
            machineTranslation: "",
            manualTranslation: "",
            fileOccurrences: {
              "id-1": [{ metadata: {}, position: { start: 1, end: 1 } }],
            },
          },
        ],
      },
      {
        id: "id-1",
        type: "file",
        name: "file.txt",
        relPath: "test/file.txt",
        content: "test",
        segments: [
          {
            id: "id-4",
            resourceId: "id-1",
            originalText: "test1",
            machineTranslation: "",
            manualTranslation: "",
            fileOccurrences: {
              "id-1": [{ metadata: {}, position: { start: 0, end: 0 } }],
            },
          },
        ],
      },
    ]);
  });

  it("should return an array of translation files", async () => {
    const files = await extractTranslations([testFile, testFile], mockedParser);
    expect(files).toEqual([
      {
        id: "id-1",
        type: "file",
        name: "file.txt",
        relPath: "test/file.txt",
        content: "test",
        segments: [
          {
            id: "id-3",
            resourceId: "id-1",
            originalText: "test",
            machineTranslation: "",
            manualTranslation: "",
            fileOccurrences: {
              "id-1": [{ metadata: {}, position: { start: 0, end: 0 } }],
            },
          },
        ],
      },
      {
        id: "id-2",
        type: "file",
        name: "file.txt",
        relPath: "test/file.txt",
        content: "test",
        segments: [
          {
            id: "id-4",
            resourceId: "id-2",
            originalText: "test",
            machineTranslation: "",
            manualTranslation: "",
            fileOccurrences: {
              "id-2": [{ metadata: {}, position: { start: 0, end: 0 } }],
            },
          },
        ],
      },
    ]);
  });
});
