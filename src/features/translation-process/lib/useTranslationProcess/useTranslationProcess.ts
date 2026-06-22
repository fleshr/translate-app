import {
  selectUntranslatedResources,
  setTranslationSegmentField,
  setTranslationSegmentsField,
  useTranslationStore,
} from "@/entities/translation";
import {
  selectSelectedTranslator,
  selectTranslatorConfig,
  translators,
  useTranslatorStore,
} from "@/entities/translator";
import { stringifyJson } from "@/shared/lib/json";
import { addLog } from "@/shared/model/logsStore";
import { notifications } from "@mantine/notifications";
import { useIntlayer } from "react-intlayer";
import {
  setTranslationProcessStatus,
  setTranslationProcessTranslatingResource,
} from "../../model/processStore/actions";
import { selectIsTranslating } from "../../model/processStore/selectors";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { selectSettings } from "../../model/settingsStore/selectors";
import { useTranslationProcessSettingsStore } from "../../model/settingsStore/store";
import { translationProcess } from "../TranslationProcess/TranslationProcess";

export const useTranslationProcess = () => {
  const content = useIntlayer("useTranslationProcess");

  const start = async () => {
    const isTranslating = selectIsTranslating(
      useTranslationProcessStore.getState(),
    );

    if (isTranslating) {
      notifications.show({ message: content.alreadyTranslatingMessage });
      return;
    }

    const selectedTranslator = selectSelectedTranslator(
      useTranslatorStore.getState(),
    );

    const translator = translators[selectedTranslator];
    const translatorConfig = selectTranslatorConfig(selectedTranslator)(
      useTranslatorStore.getState(),
    );

    if (!translator) {
      notifications.show({ message: content.notFoundMessage });
      return;
    }

    const settings = selectSettings(
      useTranslationProcessSettingsStore.getState(),
    );
    const resources = selectUntranslatedResources(
      useTranslationStore.getState(),
    );

    await translationProcess.translateResources(resources, {
      ...settings,
      translator,
      translatorConfig,
      onStart: () => {
        setTranslationProcessStatus("translating");
        addLog("info", "Translation started");
        notifications.show({ message: content.startMessage });
      },
      onResourceStart: (resource) => {
        setTranslationProcessTranslatingResource(resource.id);
      },
      onSegmentBatchStart(_, batch) {
        addLog("info", `Original: ${stringifyJson(batch)}`);
      },
      onSegmentBatchComplete(translations, response) {
        setTranslationSegmentsField(
          translations.map(({ segment, translation }) => ({
            id: segment.id,
            translation,
          })),
        );
        addLog("info", `Translation: ${stringifyJson(response)}`);
      },
      onSegmentSequentialStart(segment) {
        addLog("info", `Original: ${segment.originalText}`);
      },
      onSegmentSequentialComplete(segment, translation) {
        setTranslationSegmentField(segment.id, translation);
        addLog("info", `Translation: ${translation}`);
      },
      onEnd: () => {
        setTranslationProcessStatus("idle");
        setTranslationProcessTranslatingResource(null);
        addLog("info", "Translation completed");
        notifications.show({ message: content.completeMessage });
      },
      onStop: () => {
        setTranslationProcessStatus("idle");
        setTranslationProcessTranslatingResource(null);
        addLog("info", "Translation stopped");
        notifications.show({ message: content.stopMessage });
      },
      onError() {
        setTranslationProcessStatus("idle");
        setTranslationProcessTranslatingResource(null);
        addLog("error", "Translation error");
        notifications.show({ message: content.errorMessage });
      },
    });
  };

  const stop = () => {
    translationProcess.stop();
  };

  return { start, stop };
};
