import {
  selectIsTranslating,
  selectTotalProgress,
  selectTranslatingResourceProgress,
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
  const totalProgress = useSessionStore(selectTotalProgress);
  const resourceProgress = useSessionStore(selectTranslatingResourceProgress);
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
        done={totalProgress.done}
        total={totalProgress.total}
        data-testid="TranslationControl.TotalProgressBar"
      />
      {resourceProgress && (
        <ProgressBar
          title={content.resourceProgressTitle}
          done={resourceProgress.done}
          total={resourceProgress.total}
          data-testid="TranslationControl.ResourceProgressBar"
        />
      )}
    </Group>
  );
};
