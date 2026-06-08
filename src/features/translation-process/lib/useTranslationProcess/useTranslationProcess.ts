import {
  selectResourcesWithUntranslatedSegments,
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
import { logger } from "@/shared/lib/logger";
import { notifications } from "@mantine/notifications";
import { useIntlayer } from "react-intlayer";
import {
  setTranslationProcessStatus,
  setTranslationProcessTranslatingResource,
} from "../../model/processStore/actions";
import { selectIsTranslating } from "../../model/processStore/selectors";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { selectMode } from "../../model/settingsStore/selectors";
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

    const mode = selectMode(useTranslationProcessSettingsStore.getState());
    const resources = selectResourcesWithUntranslatedSegments(
      useTranslationStore.getState(),
    );

    await translationProcess.translateResources(resources, {
      mode,
      translator,
      translatorConfig,
      onStart: () => {
        setTranslationProcessStatus("translating");
        logger.info(content.startMessage);
        notifications.show({ message: content.startMessage });
      },
      onResourceStart: (resource) => {
        setTranslationProcessTranslatingResource(resource.id);
      },
      onSegmentBatchStart(_, batch) {
        logger.info(
          content.startSegmentMessage({ text: stringifyJson(batch) }),
        );
      },
      onSegmentBatchComplete(translations, response) {
        setTranslationSegmentsField(
          translations.map(({ segment, translation }) => ({
            id: segment.id,
            translation,
          })),
        );
        logger.info(
          content.completeSegmentMessage({ text: stringifyJson(response) }),
        );
      },
      onSegmentSequentialStart(segment) {
        logger.info(
          content.startSegmentMessage({ text: segment.originalText }),
        );
      },
      onSegmentSequentialComplete(segment, translation) {
        setTranslationSegmentField(segment.id, translation);
        logger.info(content.completeSegmentMessage({ text: translation }));
      },
      onEnd: () => {
        setTranslationProcessStatus("idle");
        setTranslationProcessTranslatingResource(null);
        logger.info(content.completeMessage);
        notifications.show({ message: content.completeMessage });
      },
      onStop: () => {
        setTranslationProcessStatus("idle");
        setTranslationProcessTranslatingResource(null);
        logger.info(content.stopMessage);
        notifications.show({ message: content.stopMessage });
      },
      onError() {
        setTranslationProcessStatus("idle");
        setTranslationProcessTranslatingResource(null);
        logger.error(content.errorMessage);
        notifications.show({ message: content.errorMessage });
      },
    });
  };

  const stop = () => {
    translationProcess.stop();
  };

  return { start, stop };
};
