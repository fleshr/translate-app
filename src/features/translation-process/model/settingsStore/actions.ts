import { useTranslationProcessSettingsStore, type State } from "./store";

export const setTranslationProcessSettingsMode = (mode: State["mode"]) => {
  useTranslationProcessSettingsStore.setState(
    { mode },
    undefined,
    "setTranslationProcessSettingsMode",
  );
};

export const setTranslationProcessSettingsBatchSize = (
  batchSize: State["batchSize"],
) => {
  useTranslationProcessSettingsStore.setState(
    { batchSize },
    undefined,
    "setTranslationProcessSettingsBatchSize",
  );
};
