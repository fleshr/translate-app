import { getTranslationSegmentMock } from "@/entities/translation/mocks";
import { getTranslatorMock } from "@/entities/translator/mocks";
import { stringifyJson } from "@/shared/lib/json";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { translationProcess } from "./TranslationProcess";

const testSegment = getTranslationSegmentMock();
const mockTranslator = getTranslatorMock({
  translate: vi.fn(() => Promise.resolve("translated")),
});

describe("features/translation-process/lib/TranslationProcess", () => {
  it("should call common callbacks", async () => {
    const onStart = vi.fn();
    const onStop = vi.fn();
    const onEnd = vi.fn();
    const onError = vi.fn();
    const onResourceStart = vi.fn();
    const onResourceComplete = vi.fn();

    await translationProcess.start([testSegment], {
      onStart,
      onStop,
      onEnd,
      onError,
      onResourceStart,
      onResourceComplete,
      mode: "sequential",
      translator: mockTranslator,
      translatorConfig: { test: "test" },
    });

    expect(onStart).toHaveBeenCalled();
    expect(onEnd).toHaveBeenCalled();
    expect(onResourceStart).toHaveBeenCalledWith("file-1");
    expect(onResourceComplete).toHaveBeenCalledWith("file-1");

    expect(onStop).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("should abort process on stop and call stop callback", async () => {
    const onStop = vi.fn();

    void translationProcess.start([testSegment], {
      onStop,
      mode: "sequential",
      translator: mockTranslator,
      translatorConfig: { test: "test" },
    });

    translationProcess.stop();

    expect(translationProcess.abortController?.signal.aborted).toBe(true);
    await expect.poll(() => onStop).toHaveBeenCalled();
  });

  it("should abort process on error and call error callback", async () => {
    vi.mocked(mockTranslator.translate).mockRejectedValue("error");
    const onError = vi.fn();

    void translationProcess.start([testSegment], {
      onError,
      mode: "sequential",
      translator: mockTranslator,
      translatorConfig: { test: "test" },
    });

    await expect.poll(() => onError).toHaveBeenCalledWith("error");
  });

  describe("sequential process", () => {
    beforeAll(() => {
      vi.mocked(mockTranslator.translate).mockResolvedValue("translated");
    });

    it("should execute translator with given options", async () => {
      await translationProcess.start([testSegment], {
        mode: "sequential",
        translator: mockTranslator,
        translatorConfig: { test: "test" },
      });

      expect(mockTranslator.translate).toHaveBeenCalledWith(
        testSegment.originalText,
        {
          config: { test: "test" },
          signal: expect.any(AbortSignal),
        },
      );
    });

    it("should call sequential callbacks", async () => {
      const onSegmentSequentialStart = vi.fn();
      const onSegmentSequentialComplete = vi.fn();

      await translationProcess.start([testSegment], {
        onSegmentSequentialStart,
        onSegmentSequentialComplete,
        mode: "sequential",
        translator: mockTranslator,
        translatorConfig: { test: "test" },
      });

      expect(onSegmentSequentialStart).toHaveBeenCalledWith(testSegment);
      expect(onSegmentSequentialComplete).toHaveBeenCalledWith(
        testSegment,
        "translated",
      );
    });
  });

  describe("batch process", () => {
    beforeAll(() => {
      vi.mocked(mockTranslator.translate).mockResolvedValue(
        '{ Line1: "translated" }',
      );
    });

    it("should execute translator with given options", async () => {
      await translationProcess.start([testSegment], {
        mode: "batch",
        translator: mockTranslator,
        translatorConfig: { test: "test" },
      });

      expect(mockTranslator.translate).toHaveBeenCalledWith(
        stringifyJson({ Line1: testSegment.originalText }),
        {
          config: { test: "test" },
          signal: expect.any(AbortSignal),
          schema: expect.objectContaining({
            shape: { Line1: expect.anything() },
          }),
        },
      );
    });

    it("should call batch callbacks", async () => {
      const onSegmentBatchStart = vi.fn();
      const onSegmentBatchComplete = vi.fn();

      await translationProcess.start([testSegment], {
        mode: "batch",
        onSegmentBatchStart,
        onSegmentBatchComplete,
        translator: mockTranslator,
        translatorConfig: { test: "test" },
      });

      expect(onSegmentBatchStart).toHaveBeenCalledWith({
        Line1: testSegment.originalText,
      });
      expect(onSegmentBatchComplete).toHaveBeenCalledWith(
        [{ id: "segment-1", translation: "translated" }],
        { Line1: "translated" },
      );
    });
  });
});
