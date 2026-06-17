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

export const setTranslationProcessSettingsSourceLanguage = (
  sourceLanguage: State["sourceLanguage"],
) => {
  useTranslationProcessSettingsStore.setState(
    { sourceLanguage },
    undefined,
    "setTranslationProcessSettingsSourceLanguage",
  );
};

export const setTranslationProcessSettingsTargetLanguage = (
  targetLanguage: State["targetLanguage"],
) => {
  useTranslationProcessSettingsStore.setState(
    { targetLanguage },
    undefined,
    "setTranslationProcessSettingsTargetLanguage",
  );
};
