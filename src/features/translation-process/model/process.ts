import type {
  TranslationBaseSegment,
  TranslationResource,
} from "@/entities/translation";
import type { Translator, TranslatorConfig } from "@/entities/translator";
import type { TranslationProcessMode } from "./translation/types";

export interface ProcessCallbacks {
  onStart: () => void;
  onStop: () => void;
  onEnd: () => void;
  onError: (e: unknown) => void;
  onResourceStart: (resource: TranslationResource) => void;
  onResourceComplete: (resource: TranslationResource) => void;
  onSegmentBatchStart: (
    segments: TranslationBaseSegment[],
    rawBatch: string[],
  ) => void;
  onSegmentBatchComplete: (
    translations: { segment: TranslationBaseSegment; translation: string }[],
    responseBatch: string[],
  ) => void;
  onSegmentSequentialStart: (segment: TranslationBaseSegment) => void;
  onSegmentSequentialComplete: (
    segment: TranslationBaseSegment,
    translation: string,
  ) => void;
}

export interface ProcessOptions extends Partial<ProcessCallbacks> {
  mode: TranslationProcessMode;
  batchSize?: number;
  translator: Translator;
  translatorConfig?: TranslatorConfig;
}
