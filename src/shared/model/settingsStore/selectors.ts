import type { TranslatorConfig } from "../translator";
import type { State } from "./store";

export const selectSelectedTranslator = (state: State): string => {
  return state.translator.selected;
};

export const selectTranslatorConfig = (translator: string) => {
  return (state: State): TranslatorConfig | undefined => {
    return state.translator.configs[translator];
  };
};

export const selectViewShowBottomPanel = (state: State): boolean => {
  return state.view.showBottomPanel;
};

export const selectViewShowSidePanel = (state: State): boolean => {
  return state.view.showSidePanel;
};
