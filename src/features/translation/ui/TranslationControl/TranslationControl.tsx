import {
  selectResourcesProgress,
  selectSegmentsProgress,
  useTranslationStore,
} from "@/entities/translation";
import {
  selectIsTranslating,
  selectTranslatingResource,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { Group } from "@mantine/core";
import { IconLanguageHiragana, IconPlayerStop } from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";
import { useTranslation } from "../../lib/useTranslation/useTranslation";

export const TranslationControl = () => {
  const content = useIntlayer("TranslationControl");
  const isTranslating = useSessionStore(selectIsTranslating);
  const translatingResource = useSessionStore(selectTranslatingResource);
  const resourcesProgress = useTranslationStore(selectResourcesProgress);
  const segmentsProgeress = useTranslationStore(
    selectSegmentsProgress(translatingResource),
  );

  const { start, stop } = useTranslation();

  if (!isTranslating) {
    return (
      <ActionIconWithTooltip
        onClick={start}
        label={content.translateLabel}
        data-testid="TranslationControl.StartButton"
      >
        <IconLanguageHiragana />
      </ActionIconWithTooltip>
    );
  }

  return (
    <Group wrap="nowrap">
      <ActionIconWithTooltip
        onClick={stop}
        label={content.stopLabel}
        data-testid="TranslationControl.StopButton"
      >
        <IconPlayerStop />
      </ActionIconWithTooltip>
      <ProgressBar
        title={content.totalProgressTitle}
        done={resourcesProgress.done}
        total={resourcesProgress.total}
        data-testid="TranslationControl.ResourcesProgressBar"
      />
      {segmentsProgeress && (
        <ProgressBar
          title={content.resourceProgressTitle}
          done={segmentsProgeress.done}
          total={segmentsProgeress.total}
          data-testid="TranslationControl.SegmentsProgressBar"
        />
      )}
    </Group>
  );
};
