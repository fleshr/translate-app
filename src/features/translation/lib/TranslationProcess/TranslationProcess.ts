import type { TranslationBaseSegment } from "@/entities/translation";
import { parseJson, stringifyJson } from "@/shared/lib/json";
import type { Id } from "@/shared/model/common";
import type { Translator, TranslatorConfig } from "@/shared/model/translator";
import { jsonrepair } from "jsonrepair";
import {
  chunk,
  entries,
  fromKeys,
  groupByProp,
  map,
  mapToObj,
  pipe,
  times,
} from "remeda";
import z from "zod";

interface Callbacks {
  onStart: () => void;
  onStop: () => void;
  onEnd: () => void;
  onError: (e: unknown) => void;
  onResourceStart: (resourceId: string) => void;
  onResourceComplete: (resourceId: string) => void;
  onSegmentBatchStart: (batch: Record<string, string>) => void;
  onSegmentBatchComplete: (
    translations: { id: Id; translation: string }[],
    response: Record<string, string>,
  ) => void;
  onSegmentSequentialStart: (segment: TranslationBaseSegment) => void;
  onSegmentSequentialComplete: (
    segment: TranslationBaseSegment,
    translation: string,
  ) => void;
}

export interface TranslationOptions extends Partial<Callbacks> {
  batch?: boolean;
  translator: Translator;
  translatorConfig?: TranslatorConfig;
}

export class TranslationProcess {
  batchSize = 10;
  abortController: AbortController | null = null;

  async start(segments: TranslationBaseSegment[], options: TranslationOptions) {
    const {
      batch,
      onStart,
      onStop,
      onEnd,
      onError,
      onResourceStart,
      onResourceComplete,
    } = options;

    onStart?.();

    this.abortController = new AbortController();
    const groups = groupByProp(segments, "resourceId");

    try {
      for (const [resourceId, segments] of entries(groups)) {
        onResourceStart?.(resourceId);

        if (batch) {
          await this.translateBatch(segments, options);
        } else {
          await this.translateSequential(segments, options);
        }

        onResourceComplete?.(resourceId);
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        onStop?.();
        return;
      }

      onError?.(e);
      return;
    }

    onEnd?.();
  }

  async translateSequential(
    segments: TranslationBaseSegment[],
    options: TranslationOptions,
  ) {
    const {
      translator,
      translatorConfig,
      onSegmentSequentialStart,
      onSegmentSequentialComplete,
    } = options;

    for (const segment of segments) {
      const { originalText } = segment;

      onSegmentSequentialStart?.(segment);

      const tranlation = await translator.translate(originalText, {
        config: translatorConfig,
        signal: this.abortController?.signal,
      });

      this.abortController?.signal.throwIfAborted();
      onSegmentSequentialComplete?.(segment, tranlation);
    }
  }

  async translateBatch(
    segments: TranslationBaseSegment[],
    options: TranslationOptions,
  ) {
    const {
      translator,
      translatorConfig,
      onSegmentBatchStart,
      onSegmentBatchComplete,
    } = options;

    for (const batch of chunk(segments, this.batchSize)) {
      const batchObj = mapToObj(batch, ({ originalText }, i) => {
        return [`Line${i + 1}`, originalText];
      });

      const batchSchema = z.object(
        pipe(
          batch.length,
          times((i) => `Line${i + 1}`),
          fromKeys(() => z.string()),
        ),
      );

      onSegmentBatchStart?.(batchObj);

      const responseJson = await translator.translate(stringifyJson(batchObj), {
        schema: batchSchema,
        config: translatorConfig,
        signal: this.abortController?.signal,
      });

      const responseObj = batchSchema.parse(
        parseJson(jsonrepair(responseJson)),
      );
      const translations = map(batch, ({ id }, i) => ({
        id,
        translation: responseObj[`Line${i + 1}`] ?? "",
      }));

      this.abortController?.signal.throwIfAborted();
      onSegmentBatchComplete?.(translations, responseObj);
    }
  }

  stop() {
    this.abortController?.abort();
  }
}

export const translationProcess = new TranslationProcess();
