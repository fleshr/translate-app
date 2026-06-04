import {
  selectUntranslatedSegments,
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
import {
  selectIsTranslating,
  setSessionStatus,
  setSessionTranslatingResource,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { notifications } from "@mantine/notifications";
import { useIntlayer } from "react-intlayer";
import { translationProcess } from "../TranslationProcess/TranslationProcess";

export const useTranslation = () => {
  const content = useIntlayer("useTranslation");

  const start = async () => {
    const isTranslating = selectIsTranslating(useSessionStore.getState());

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

    const segments = selectUntranslatedSegments(useTranslationStore.getState());
    await translationProcess.start(segments, {
      batch: true,
      translator,
      translatorConfig,
      onStart: () => {
        setSessionStatus("translating");

        logger.info(content.startMessage);
        notifications.show({ message: content.startMessage });
      },
      onResourceStart: (resourceId) => {
        setSessionTranslatingResource(resourceId);
      },
      onSegmentBatchStart(batch) {
        logger.info(
          content.startSegmentMessage({ text: stringifyJson(batch) }),
        );
      },
      onSegmentBatchComplete(translations, response) {
        setTranslationSegmentsField(translations);

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
        setSessionStatus("idle");
        setSessionTranslatingResource(null);

        logger.info(content.completeMessage);
        notifications.show({ message: content.completeMessage });
      },
      onStop: () => {
        setSessionStatus("stopped");
        setSessionTranslatingResource(null);

        logger.info(content.stopMessage);
        notifications.show({ message: content.stopMessage });
      },
      onError() {
        setSessionStatus("stopped");
        setSessionTranslatingResource(null);

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
