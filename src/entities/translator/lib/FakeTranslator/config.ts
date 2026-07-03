import type {
  TranslatorConfig,
  TranslatorConfigForm,
} from "../../model/translator";

export interface Config extends TranslatorConfig {
  delay: number;
}

export const defaultConfig: Config = {
  delay: 3000,
};

export const configForm: TranslatorConfigForm<Config> = {
  default: defaultConfig,
  fields: [{ key: "delay", type: "number", label: "Delay" }],
};
