import type {
  TranslatorConfig,
  TranslatorConfigForm,
} from "../../model/translator";

export interface Config extends TranslatorConfig {
  baseURL: string;
  apiKey: string;
  model: string;
  systemPrompt: string;
}

export const defaultConfig: Config = {
  baseURL: "http://127.0.0.1:8080/v1/",
  apiKey: "llama-server",
  model: "sugoitoolkit/Sugoi-14B-Ultra-GGUF:Q4_K_M",
  systemPrompt:
    "You are a professional localizer whose primary goal is to translate {source_lang} to {target_lang}. You should use colloquial or slang or nsfw vocabulary if it makes the translation more accurate. Always respond in {target_lang}.",
};

export const configForm: TranslatorConfigForm<Config> = {
  default: defaultConfig,
  fields: [
    {
      key: "baseURL",
      type: "text",
      label: "URL",
    },
    {
      key: "apiKey",
      type: "text",
      label: "API Key",
    },
    {
      key: "model",
      type: "text",
      label: "Model",
    },
    {
      key: "systemPrompt",
      type: "textarea",
      label: "System prompt template",
      description:
        "Source language - {source_lang}, Target language - {target_lang}",
    },
  ],
};
