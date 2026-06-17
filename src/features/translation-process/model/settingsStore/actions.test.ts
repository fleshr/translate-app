import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import {
  setTranslationProcessSettingsBatchSize,
  setTranslationProcessSettingsMode,
  setTranslationProcessSettingsSourceLanguage,
  setTranslationProcessSettingsTargetLanguage,
} from "./actions";
import { useTranslationProcessSettingsStore } from "./store";

describe("features/translation-process/model/settingsStore/actions", () => {
  afterEach(() => {
    resetStore(useTranslationProcessSettingsStore);
  });

  describe("setTranslationProcessSettingsMode", () => {
    it("should set translation process mode", () => {
      setTranslationProcessSettingsMode("batch");
      expect(useTranslationProcessSettingsStore.getState().mode).toBe("batch");

      setTranslationProcessSettingsMode("sequential");
      expect(useTranslationProcessSettingsStore.getState().mode).toBe(
        "sequential",
      );
    });
  });

  describe("setTranslationProcessSettingsBatchSize", () => {
    it("should set translation process batch size", () => {
      setTranslationProcessSettingsBatchSize(1);
      expect(useTranslationProcessSettingsStore.getState().batchSize).toBe(1);

      setTranslationProcessSettingsBatchSize(30);
      expect(useTranslationProcessSettingsStore.getState().batchSize).toBe(30);
    });
  });

  describe("setTranslationProcessSettingsSourceLanguage", () => {
    it("should set translation process source language", () => {
      setTranslationProcessSettingsSourceLanguage("ru");
      expect(useTranslationProcessSettingsStore.getState().sourceLanguage).toBe(
        "ru",
      );

      setTranslationProcessSettingsSourceLanguage("en");
      expect(useTranslationProcessSettingsStore.getState().sourceLanguage).toBe(
        "en",
      );
    });
  });

  describe("setTranslationProcessSettingsTargetLanguage", () => {
    it("should set translation process target language", () => {
      setTranslationProcessSettingsTargetLanguage("ru");
      expect(useTranslationProcessSettingsStore.getState().targetLanguage).toBe(
        "ru",
      );

      setTranslationProcessSettingsTargetLanguage("en");
      expect(useTranslationProcessSettingsStore.getState().targetLanguage).toBe(
        "en",
      );
    });
  });
});
