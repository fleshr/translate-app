import type {
  TranslationResource,
  TranslationSegment,
} from "@/entities/translation";
import type { Translator, TranslatorConfig } from "@/entities/translator";
import type { LanguageCode } from "iso-639-1";
import type { TranslationProcessMode } from "./translation/types";

export interface ProcessCallbacks {
  onStart: () => void;
  onStop: () => void;
  onEnd: () => void;
  onError: (e: unknown) => void;
  onResourceStart: (resource: TranslationResource) => void;
  onResourceComplete: (resource: TranslationResource) => void;
  onSegmentBatchStart: (
    segments: TranslationSegment[],
    rawBatch: string[],
  ) => void;
  onSegmentBatchComplete: (
    translations: { segment: TranslationSegment; translation: string }[],
    responseBatch: string[],
  ) => void;
  onSegmentSequentialStart: (segment: TranslationSegment) => void;
  onSegmentSequentialComplete: (
    segment: TranslationSegment,
    translation: string,
  ) => void;
}

export interface ProcessOptions extends Partial<ProcessCallbacks> {
  mode: TranslationProcessMode;
  batchSize?: number;
  translator: Translator;
  translatorConfig?: TranslatorConfig;
  sourceLanguage: LanguageCode;
  targetLanguage: LanguageCode;
}
