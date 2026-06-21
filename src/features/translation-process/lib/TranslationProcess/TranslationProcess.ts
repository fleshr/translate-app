import type {
  TranslationResource,
  TranslationSegment,
} from "@/entities/translation";
import { chunk } from "remeda";
import { DEFAULT_BATCH_SIZE } from "../../config";
import type { ProcessOptions } from "../../model/process";

export class TranslationProcess {
  private abortController: AbortController | null = null;

  private async translateWrapper(
    callback: () => Promise<void>,
    options: ProcessOptions,
  ): Promise<void> {
    const { onStart, onEnd, onError, onStop } = options;
    this.abortController = new AbortController();

    try {
      onStart?.();
      await callback();
      onEnd?.();
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        onStop?.();
      } else {
        onError?.(e);
      }
    }
  }

  async translateResources(
    resources: TranslationResource[],
    options: ProcessOptions,
  ): Promise<void> {
    const { onResourceStart, onResourceComplete } = options;

    await this.translateWrapper(async () => {
      for (const resource of resources) {
        onResourceStart?.(resource);
        await this.translate(resource.segments, options);
        onResourceComplete?.(resource);
      }
    }, options);
  }

  async translateSegments(
    segments: TranslationSegment[],
    options: ProcessOptions,
  ): Promise<void> {
    await this.translateWrapper(
      () => this.translate(segments, options),
      options,
    );
  }

  private async translate(
    segments: TranslationSegment[],
    options: ProcessOptions,
  ): Promise<void> {
    const { mode } = options;

    if (mode === "batch") {
      await this.translateBatch(segments, options);
    } else {
      await this.translateSequential(segments, options);
    }
  }

  private async translateSequential(
    segments: TranslationSegment[],
    options: ProcessOptions,
  ): Promise<void> {
    const {
      translator,
      translatorConfig,
      sourceLanguage,
      targetLanguage,
      onSegmentSequentialStart,
      onSegmentSequentialComplete,
    } = options;

    for (const segment of segments) {
      const { originalText } = segment;

      onSegmentSequentialStart?.(segment);

      const tranlation = await translator.translate(originalText, {
        source: sourceLanguage,
        target: targetLanguage,
        config: translatorConfig,
        signal: this.abortController?.signal,
      });

      onSegmentSequentialComplete?.(segment, tranlation);
    }
  }

  private async translateBatch(
    segments: TranslationSegment[],
    options: ProcessOptions,
  ): Promise<void> {
    const {
      translator,
      translatorConfig,
      sourceLanguage,
      targetLanguage,
      batchSize = DEFAULT_BATCH_SIZE,
      onSegmentBatchStart,
      onSegmentBatchComplete,
    } = options;

    if (!translator.translateBatch) {
      throw new Error("Translator does not support batch translation");
    }

    for (const batch of chunk(segments, batchSize)) {
      const batchArray = batch.map(({ originalText }) => originalText);

      onSegmentBatchStart?.(batch, batchArray);

      const responseArray = await translator.translateBatch(batchArray, {
        source: sourceLanguage,
        target: targetLanguage,
        config: translatorConfig,
        signal: this.abortController?.signal,
      });

      const translations = batch.map((segment, index) => ({
        segment,
        translation: responseArray[index] ?? "",
      }));

      onSegmentBatchComplete?.(translations, responseArray);
    }
  }

  stop(): void {
    this.abortController?.abort();
  }
}

export const translationProcess = new TranslationProcess();
