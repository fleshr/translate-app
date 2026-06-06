import type { BaseProps } from "@/shared/model/component";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { Menu } from "@mantine/core";
import { IconArrowBigRight, IconArrowBigRightLines } from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";
import { selectIsTranslating } from "../../model/processStore/selectors";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { setTranslationProcessSettingsMode } from "../../model/settingsStore/actions";
import { selectMode } from "../../model/settingsStore/selectors";
import { useTranslationProcessSettingsStore } from "../../model/settingsStore/store";

export const TranslationModeSelector = (props: BaseProps) => {
  const { "data-testid": dataTestId = "TranslationModeSelector" } = props;
  const content = useIntlayer("TranslationModeSelector");
  const mode = useTranslationProcessSettingsStore(selectMode);
  const isTranslating = useTranslationProcessStore(selectIsTranslating);

  return (
    <Menu shadow="sm" data-testid={dataTestId}>
      <Menu.Target>
        <ActionIconWithTooltip
          label={content.buttonTooltip}
          disabled={isTranslating}
        >
          {mode === "sequential" ? (
            <IconArrowBigRight data-testid={`${dataTestId}.SequentialIcon`} />
          ) : (
            <IconArrowBigRightLines data-testid={`${dataTestId}.BatchIcon`} />
          )}
        </ActionIconWithTooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{content.menuLabel}</Menu.Label>
        <Menu.CheckboxItem
          checked={mode === "sequential"}
          onChange={() => setTranslationProcessSettingsMode("sequential")}
          data-testid={`${dataTestId}.CheckboxItem.Sequential`}
          closeMenuOnClick
        >
          {content.sequentialMode}
        </Menu.CheckboxItem>
        <Menu.CheckboxItem
          checked={mode === "batch"}
          onChange={() => setTranslationProcessSettingsMode("batch")}
          data-testid={`${dataTestId}.CheckboxItem.Batch`}
          closeMenuOnClick
        >
          {content.batchMode}
        </Menu.CheckboxItem>
      </Menu.Dropdown>
    </Menu>
  );
};
