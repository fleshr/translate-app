import type { TranslatorConfig } from "../translator";
import type { State } from "./store";

export const selectSelectedTranslator = (state: State): string => {
  return state.selected;
};

export const selectTranslatorConfig = (translator: string) => {
  return (state: State): TranslatorConfig | undefined => {
    return state.configs[translator];
  };
};
