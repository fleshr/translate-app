import type { TranslatorConfig } from "../translator";
import { useSettingsStore } from "./store";

export const setSettingsTranslatorConfig = (
  translator: string,
  config: TranslatorConfig,
) => {
  useSettingsStore.setState(
    (state) => {
      state.translator.configs[translator] = config;
    },
    undefined,
    "setSettingsTranslatorConfig",
  );
};

export const setSettingsSelectedTranslator = (translator: string) => {
  useSettingsStore.setState(
    (state) => {
      state.translator.selected = translator;
    },
    undefined,
    "setSettingsSelectedTranslator",
  );
};

export const toggleSettingsBottomPanel = () => {
  useSettingsStore.setState(
    (state) => {
      state.view.showBottomPanel = !state.view.showBottomPanel;
    },
    undefined,
    "toggleSettingsBottomPanel",
  );
};

export const toggleSettingsSidePanel = () => {
  useSettingsStore.setState(
    (state) => {
      state.view.showSidePanel = !state.view.showSidePanel;
    },
    undefined,
    "toggleSettingsSidePanel",
  );
};
