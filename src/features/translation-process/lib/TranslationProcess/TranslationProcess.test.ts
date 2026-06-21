import {
  getTranslationCommonMock,
  getTranslationFileMock,
  getTranslationSegmentMock,
} from "@/entities/translation/mocks";
import { getTranslatorMock } from "@/entities/translator/mocks";
import { describe, expect, it, vi } from "vitest";
import type { ProcessOptions } from "../../model/process";
import { translationProcess } from "./TranslationProcess";

const mockTranslator = getTranslatorMock({
  translate: vi.fn().mockResolvedValue("translated"),
  translateBatch: vi.fn().mockResolvedValue(["translated", "translated"]),
});

const testSegement1 = getTranslationSegmentMock({ id: "segment-1" });
const testSegement2 = getTranslationSegmentMock({ id: "segment-2" });
const testSegement3 = getTranslationSegmentMock({ id: "segment-3" });
const testTransationCommon = getTranslationCommonMock({
  segments: [testSegement1],
});
const testTranslationFile = getTranslationFileMock({
  segments: [testSegement2],
});

const sequentialOptions = {
  mode: "sequential",
  translator: mockTranslator,
  translatorConfig: { test: "test" },
  sourceLanguage: "en",
  targetLanguage: "ru",
} satisfies ProcessOptions;

const batchOptions = {
  mode: "batch",
  batchSize: 2,
  translator: mockTranslator,
  translatorConfig: { test: "test" },
  sourceLanguage: "en",
  targetLanguage: "ru",
} satisfies ProcessOptions;

describe("features/translation-process/lib/TranslationProcess", () => {
  describe("translateResources", () => {
    it("should translate resources", async () => {
      // @ts-expect-error private method
      const translateSpy = vi.spyOn(translationProcess, "translate");

      await translationProcess.translateResources(
        [testTransationCommon, testTranslationFile],
        sequentialOptions,
      );

      expect(translateSpy).toHaveBeenCalledTimes(2);
      expect(translateSpy).nthCalledWith(1, [testSegement1], sequentialOptions);
      expect(translateSpy).nthCalledWith(2, [testSegement2], sequentialOptions);
    });

    it("should call callbacks", async () => {
      const options = {
        ...sequentialOptions,
        onStart: vi.fn(),
        onEnd: vi.fn(),
        onResourceStart: vi.fn(),
        onResourceComplete: vi.fn(),
      } satisfies ProcessOptions;

      await translationProcess.translateResources(
        [testTransationCommon, testTranslationFile],
        options,
      );

      expect(options.onStart).toHaveBeenCalledTimes(1);
      expect(options.onEnd).toHaveBeenCalledTimes(1);

      expect(options.onResourceStart).toHaveBeenCalledTimes(2);
      expect(options.onResourceStart).nthCalledWith(1, testTransationCommon);
      expect(options.onResourceStart).nthCalledWith(2, testTranslationFile);

      expect(options.onResourceComplete).toHaveBeenCalledTimes(2);
      expect(options.onResourceComplete).nthCalledWith(1, testTransationCommon);
      expect(options.onResourceComplete).nthCalledWith(2, testTranslationFile);
    });

    it("should handle error", async () => {
      vi.mocked(mockTranslator.translate).mockRejectedValueOnce("error");

      const options = {
        ...sequentialOptions,
        onError: vi.fn(),
      } satisfies ProcessOptions;

      await translationProcess.translateResources(
        [testTransationCommon, testTranslationFile],
        options,
      );

      expect(options.onError).nthCalledWith(1, "error");
    });

    it("should handle stop", async () => {
      vi.mocked(mockTranslator.translate).mockImplementationOnce(
        (_, options) => {
          return new Promise((_, reject) => {
            options?.signal?.addEventListener(
              "abort",
              // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
              () => reject(options?.signal?.reason),
              { once: true },
            );
          });
        },
      );

      const options = {
        ...sequentialOptions,
        onStop: vi.fn(),
      } satisfies ProcessOptions;

      void translationProcess.translateResources(
        [testTransationCommon, testTranslationFile],
        options,
      );

      translationProcess.stop();

      await expect.poll(() => options.onStop).toHaveBeenCalledTimes(1);
    });
  });

  describe("translateSegments", () => {
    it("should translate segments", async () => {
      // @ts-expect-error private method
      const translateSpy = vi.spyOn(translationProcess, "translate");

      await translationProcess.translateSegments(
        [testSegement1, testSegement2],
        sequentialOptions,
      );

      expect(translateSpy).toHaveBeenCalledTimes(1);
      expect(translateSpy).toHaveBeenCalledWith(
        [testSegement1, testSegement2],
        sequentialOptions,
      );
    });

    it("should call callbacks", async () => {
      const options = {
        ...sequentialOptions,
        onStart: vi.fn(),
        onEnd: vi.fn(),
      } satisfies ProcessOptions;

      await translationProcess.translateSegments(
        [testSegement1, testSegement2],
        options,
      );

      expect(options.onStart).toHaveBeenCalledTimes(1);
      expect(options.onEnd).toHaveBeenCalledTimes(1);
    });

    it("should handle error", async () => {
      vi.mocked(mockTranslator.translate).mockRejectedValueOnce("error");

      const options = {
        ...sequentialOptions,
        onError: vi.fn(),
      } satisfies ProcessOptions;

      await translationProcess.translateSegments(
        [testSegement1, testSegement2],
        options,
      );

      expect(options.onError).nthCalledWith(1, "error");
    });

    it("should handle stop", async () => {
      vi.mocked(mockTranslator.translate).mockImplementationOnce(
        (_, options) => {
          return new Promise((_, reject) => {
            options?.signal?.addEventListener(
              "abort",
              // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
              () => reject(options?.signal?.reason),
              { once: true },
            );
          });
        },
      );

      const options = {
        ...sequentialOptions,
        onStop: vi.fn(),
      } satisfies ProcessOptions;

      void translationProcess.translateSegments(
        [testSegement1, testSegement2],
        options,
      );

      translationProcess.stop();

      await expect.poll(() => options.onStop).toHaveBeenCalledTimes(1);
    });
  });

  describe("translateSequential", () => {
    it("should translate segments", async () => {
      await translationProcess.translateSegments(
        [testSegement1, testSegement2],
        sequentialOptions,
      );

      expect(mockTranslator.translate).nthCalledWith(
        1,
        testSegement1.originalText,
        {
          source: sequentialOptions.sourceLanguage,
          target: sequentialOptions.targetLanguage,
          config: sequentialOptions.translatorConfig,
          signal: expect.any(AbortSignal),
        },
      );
      expect(mockTranslator.translate).nthCalledWith(
        2,
        testSegement2.originalText,
        {
          source: sequentialOptions.sourceLanguage,
          target: sequentialOptions.targetLanguage,
          config: sequentialOptions.translatorConfig,
          signal: expect.any(AbortSignal),
        },
      );
    });

    it("should call callbacks", async () => {
      const options = {
        ...sequentialOptions,
        onSegmentSequentialStart: vi.fn(),
        onSegmentSequentialComplete: vi.fn(),
      } satisfies ProcessOptions;

      await translationProcess.translateSegments(
        [testSegement1, testSegement2],
        options,
      );

      expect(options.onSegmentSequentialStart).nthCalledWith(1, testSegement1);
      expect(options.onSegmentSequentialStart).nthCalledWith(2, testSegement2);

      expect(options.onSegmentSequentialComplete).nthCalledWith(
        1,
        testSegement1,
        "translated",
      );
      expect(options.onSegmentSequentialComplete).nthCalledWith(
        2,
        testSegement2,
        "translated",
      );
    });
  });

  describe("translateBatch", () => {
    it("should call onError when translator not support batch", async () => {
      const options = {
        ...batchOptions,
        onError: vi.fn(),
        translator: { ...mockTranslator, translateBatch: undefined },
      } satisfies ProcessOptions;

      await translationProcess.translateSegments(
        [testSegement1, testSegement2],
        options,
      );

      expect(options.onError).toHaveBeenCalledWith(
        new Error("Translator does not support batch translation"),
      );
    });

    it("should translate segments", async () => {
      await translationProcess.translateSegments(
        [testSegement1, testSegement2, testSegement3],
        batchOptions,
      );

      expect(mockTranslator.translateBatch).nthCalledWith(
        1,
        [testSegement1.originalText, testSegement2.originalText],
        {
          source: batchOptions.sourceLanguage,
          target: batchOptions.targetLanguage,
          config: batchOptions.translatorConfig,
          signal: expect.any(AbortSignal),
        },
      );
      expect(mockTranslator.translateBatch).nthCalledWith(
        2,
        [testSegement3.originalText],
        {
          source: batchOptions.sourceLanguage,
          target: batchOptions.targetLanguage,
          config: batchOptions.translatorConfig,
          signal: expect.any(AbortSignal),
        },
      );
    });

    it("should call callbacks", async () => {
      vi.mocked(mockTranslator.translateBatch)
        ?.mockResolvedValueOnce(["translated", "translated"])
        .mockResolvedValueOnce(["translated"]);

      const options = {
        ...batchOptions,
        onSegmentBatchStart: vi.fn(),
        onSegmentBatchComplete: vi.fn(),
      } satisfies ProcessOptions;

      await translationProcess.translateSegments(
        [testSegement1, testSegement2, testSegement3],
        options,
      );

      expect(options.onSegmentBatchStart).nthCalledWith(
        1,
        [testSegement1, testSegement2],
        [testSegement1.originalText, testSegement2.originalText],
      );
      expect(options.onSegmentBatchStart).nthCalledWith(
        2,
        [testSegement3],
        [testSegement3.originalText],
      );

      expect(options.onSegmentBatchComplete).nthCalledWith(
        1,
        [
          { segment: testSegement1, translation: "translated" },
          { segment: testSegement2, translation: "translated" },
        ],
        ["translated", "translated"],
      );
      expect(options.onSegmentBatchComplete).nthCalledWith(
        2,
        [{ segment: testSegement3, translation: "translated" }],
        ["translated"],
      );
    });
  });
});
