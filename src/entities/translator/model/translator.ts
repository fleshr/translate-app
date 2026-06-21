import type { FormField } from "@/shared/model/form";
import type { LanguageCode } from "iso-639-1";
import type { z } from "zod";

export type TranslatorConfig = Record<string, unknown>;

export interface TranslatorOptions<Config extends TranslatorConfig> {
  config?: Config;
  signal?: AbortSignal;
  source: LanguageCode;
  target: LanguageCode;
}

export interface TranslatorConfigForm<
  Config extends TranslatorConfig = TranslatorConfig,
> {
  default: Config;
  fields: FormField[];
  schema?: z.ZodObject<Record<string, z.ZodType>>;
}

export interface Translator<
  Config extends TranslatorConfig = TranslatorConfig,
> {
  name: string;
  version: string;
  configForm?: TranslatorConfigForm<Config>;
  translate(input: string, options: TranslatorOptions<Config>): Promise<string>;
  translateBatch?(
    input: string[],
    options: TranslatorOptions<Config>,
  ): Promise<string[]>;
}
