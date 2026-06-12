import type { Parser } from "@/entities/parser";
import { nanoid } from "nanoid";
import { afterEach, describe, expect, it, vi } from "vitest";
import { extractResources } from "./extractResources";

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
  replaceText: vi.fn(() => new ArrayBuffer()),
  extractText: vi.fn(() => [
    {
      text: "test",
      type: "file" as const,
      position: { start: 0, end: 0 },
    },
  ]),
});

const testFile = new File([""], "file.txt");
// @ts-expect-error dont exist in test but exists in browser
testFile.webkitRelativePath = "test/file.txt";

describe("widgets/header/lib/extractResources", () => {
  afterEach(() => {
    idPrefix = 1;
  });

  it("should return an empty array if no files are provided", async () => {
    const files = await extractResources([], mockedParser);
    expect(files).toEqual([]);
  });

  it("should return an empty array if no supported files are provided", async () => {
    mockedParser.checkFile.mockReturnValueOnce(false);
    const files = await extractResources([testFile], mockedParser);
    expect(files).toEqual([]);
  });

  it("should return an empty array if no segments are extracted", async () => {
    mockedParser.extractText.mockReturnValueOnce([]);
    const files = await extractResources([testFile], mockedParser);
    expect(files).toEqual([]);
  });

  it("should dedulicate segments in files", async () => {
    mockedParser.extractText.mockReturnValueOnce([
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
    ]);
    const files = await extractResources([testFile], mockedParser);
    expect(files).toEqual([
      {
        id: "id-1",
        type: "file",
        name: "file.txt",
        relPath: "test/file.txt",
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
    mockedParser.extractText.mockReturnValueOnce([
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
    ]);
    const files = await extractResources([testFile], mockedParser);
    expect(files).toEqual([
      {
        id: "id-3",
        type: "common",
        name: "Common: names",
        relPath: "*",
        segments: [
          {
            id: "id-4",
            resourceId: "id-3",
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
        segments: [
          {
            id: "id-2",
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
    const files = await extractResources([testFile, testFile], mockedParser);
    expect(files).toEqual([
      {
        id: "id-1",
        type: "file",
        name: "file.txt",
        relPath: "test/file.txt",
        segments: [
          {
            id: "id-2",
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
        id: "id-3",
        type: "file",
        name: "file.txt",
        relPath: "test/file.txt",
        segments: [
          {
            id: "id-4",
            resourceId: "id-3",
            originalText: "test",
            machineTranslation: "",
            manualTranslation: "",
            fileOccurrences: {
              "id-3": [{ metadata: {}, position: { start: 0, end: 0 } }],
            },
          },
        ],
      },
    ]);
  });
});
