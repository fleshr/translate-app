import type { BaseProps } from "@/shared/model/component";

import { Group } from "@mantine/core";
import { selectIsTranslating } from "../../model/processStore/selectors";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { TranslateButton } from "../TranslateButton/TranslateButton";
import { TranslationModeSelector } from "../TranslationModeSelector/TranslationModeSelector";
import { TranslationProgress } from "../TranslationProgress/TranslationProgress";

export const TranslationControls = (props: BaseProps) => {
  const { "data-testid": dataTestId = "TranslationControls" } = props;
  const isTranslating = useTranslationProcessStore(selectIsTranslating);

  return (
    <Group wrap="nowrap" data-testid={dataTestId}>
      <Group gap="xs" wrap="nowrap">
        <TranslationModeSelector
          data-testid={`${dataTestId}.TranslationModeSelector`}
        />
        <TranslateButton data-testid={`${dataTestId}.TranslateButton`} />
      </Group>
      {isTranslating && (
        <TranslationProgress
          data-testid={`${dataTestId}.TranslationProgress`}
        />
      )}
    </Group>
  );
};
