import type { BaseProps } from "@/shared/model/component";

import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { IconLanguageHiragana, IconPlayerStop } from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";
import { useTranslationProcess } from "../../lib/useTranslationProcess/useTranslationProcess";
import { selectIsTranslating } from "../../model/processStore/selectors";
import { useTranslationProcessStore } from "../../model/processStore/store";

export const TranslateButton = (props: BaseProps) => {
  const { "data-testid": dataTestId = "TranslateButton" } = props;
  const content = useIntlayer("TranslateButton");
  const { start, stop } = useTranslationProcess();
  const isTranslating = useTranslationProcessStore(selectIsTranslating);

  return (
    <ActionIconWithTooltip
      onClick={isTranslating ? stop : start}
      label={isTranslating ? content.stopLabel : content.translateLabel}
      data-testid={dataTestId}
    >
      {isTranslating ? (
        <IconPlayerStop data-testid={`${dataTestId}.StopIcon`} />
      ) : (
        <IconLanguageHiragana data-testid={`${dataTestId}.StartIcon`} />
      )}
    </ActionIconWithTooltip>
  );
};
