import {
  selectResourcesProgress,
  selectSegmentsProgress,
  useTranslationStore,
} from "@/entities/translation";
import type { BaseProps } from "@/shared/model/component";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { Group } from "@mantine/core";
import { useIntlayer } from "react-intlayer";
import { selectTranslatingResource } from "../../model/processStore/selectors";
import { useTranslationProcessStore } from "../../model/processStore/store";

export const TranslationProgress = (props: BaseProps) => {
  const { "data-testid": dataTestId = "TranslationProgress" } = props;
  const content = useIntlayer("TranslationProgress");
  const translatingResource = useTranslationProcessStore(
    selectTranslatingResource,
  );
  const resourcesProgress = useTranslationStore(selectResourcesProgress);
  const segmentsProgeress = useTranslationStore(
    selectSegmentsProgress(translatingResource),
  );

  return (
    <Group wrap="nowrap" data-testid={dataTestId}>
      <ProgressBar
        title={content.resourcesProgressTitle}
        done={resourcesProgress.done}
        total={resourcesProgress.total}
        data-testid={`${dataTestId}.ResourcesProgressBar`}
      />
      {segmentsProgeress && (
        <ProgressBar
          title={content.segmentsProgressTitle}
          done={segmentsProgeress.done}
          total={segmentsProgeress.total}
          data-testid={`${dataTestId}.SegmentsProgressBar`}
        />
      )}
    </Group>
  );
};
