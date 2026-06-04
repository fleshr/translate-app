import type { TranslatorConfig } from "../translator";
import { useTranslatorStore } from "./store";

export const setTranslatorConfig = (
  translator: string,
  config: TranslatorConfig,
) => {
  useTranslatorStore.setState(
    (state) => {
      state.configs[translator] = config;
    },
    undefined,
    "setTranslatorConfig",
  );
};

export const setSelectedTranslator = (translator: string) => {
  useTranslatorStore.setState(
    (state) => {
      state.selected = translator;
    },
    undefined,
    "setSelectedTranslator",
  );
};
