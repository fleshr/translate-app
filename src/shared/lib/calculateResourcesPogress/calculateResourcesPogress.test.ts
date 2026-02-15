import {
  getTranslationFileMock,
  getTranslationSegmentMock,
} from "@/shared/mocks/translation";
import type { TranslationResource } from "@/shared/model/translation";
import { describe, expect, it } from "vitest";
import { calculateResourcesPogress } from "./calculateResourcesPogress";

describe("shared/lib/calculateResourcesPogress", () => {
  it("should return empty object if files is empty", () => {
    const files: TranslationResource[] = [];
    expect(calculateResourcesPogress(files)).toEqual({});
  });

  it("should return correct progress with empty segments", () => {
    const files: TranslationResource[] = [getTranslationFileMock()];

    expect(calculateResourcesPogress(files)).toEqual({
      "file-1": { done: 0, total: 0 },
    });
  });

  it("should return correct progress with segment machineTranslation", () => {
    const files: TranslationResource[] = [
      getTranslationFileMock({
        segments: [
          getTranslationSegmentMock({
            machineTranslation: "test",
            manualTranslation: "",
          }),
        ],
      }),
    ];

    expect(calculateResourcesPogress(files)).toEqual({
      "file-1": { done: 1, total: 1 },
    });
  });

  it("should return correct progress with segment manualTranslation", () => {
    const files: TranslationResource[] = [
      getTranslationFileMock({
        segments: [
          getTranslationSegmentMock({
            machineTranslation: "",
            manualTranslation: "test",
          }),
        ],
      }),
    ];

    expect(calculateResourcesPogress(files)).toEqual({
      "file-1": { done: 1, total: 1 },
    });
  });

  it("should return correct progress for files", () => {
    const files: TranslationResource[] = [
      getTranslationFileMock({
        id: "file-1",
        segments: [
          getTranslationSegmentMock({
            id: "segment-1",
            machineTranslation: "",
            manualTranslation: "",
          }),
          getTranslationSegmentMock({
            id: "segment-2",
            machineTranslation: "",
            manualTranslation: "",
          }),
        ],
      }),
      getTranslationFileMock({
        id: "file-2",
        segments: [
          getTranslationSegmentMock({ id: "segment-3" }),
          getTranslationSegmentMock({
            id: "segment-4",
            machineTranslation: "",
            manualTranslation: "",
          }),
        ],
      }),
      getTranslationFileMock({
        id: "file-3",
        segments: [
          getTranslationSegmentMock({ id: "segment-5" }),
          getTranslationSegmentMock({ id: "segment-6" }),
        ],
      }),
    ];

    expect(calculateResourcesPogress(files)).toEqual({
      "file-1": { done: 0, total: 2 },
      "file-2": { done: 1, total: 2 },
      "file-3": { done: 2, total: 2 },
    });
  });
});
