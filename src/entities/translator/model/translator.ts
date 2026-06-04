import type { FormField } from "@/shared/model/form";
import type { z } from "zod";

export type TranslatorConfig = Record<string, unknown>;

export interface TranslatorOptions<Config extends TranslatorConfig> {
  config?: Config;
  schema?: z.ZodObject;
  signal?: AbortSignal;
}

export interface Translator<
  Config extends TranslatorConfig = TranslatorConfig,
> {
  name: string;
  version: string;
  configFields: FormField[];
  configSchema?: z.ZodObject<Record<string, z.ZodType>>;
  translate(
    input: string,
    options?: TranslatorOptions<Config>,
  ): Promise<string>;
}
