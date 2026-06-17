import { getLanguageLabel } from "@/shared/lib/intl";
import type { BaseProps } from "@/shared/model/component";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { Group, Select, Tooltip, type ComboboxItem } from "@mantine/core";
import { IconArrowsDiff } from "@tabler/icons-react";
import ISO6391, { type LanguageCode } from "iso-639-1";
import { useLocale } from "react-intlayer";
import {
  setTranslationProcessSettingsSourceLanguage,
  setTranslationProcessSettingsTargetLanguage,
} from "../../model/settingsStore/actions";
import {
  selectSourceLanguage,
  selectTargetLanguage,
} from "../../model/settingsStore/selectors";
import { useTranslationProcessSettingsStore } from "../../model/settingsStore/store";

export const TranslationLanguageSelector = (props: BaseProps) => {
  const { "data-testid": dataTestId = "TranslationLanguageSelector" } = props;
  const { locale } = useLocale();
  const targetLanguage =
    useTranslationProcessSettingsStore(selectTargetLanguage);
  const sourceLanguage =
    useTranslationProcessSettingsStore(selectSourceLanguage);

  const languages: ComboboxItem<LanguageCode>[] = ISO6391.getAllCodes().map(
    (code) => ({
      label: getLanguageLabel(code, locale),
      value: code,
    }),
  );

  const handleSourceLanguageChange = (value: LanguageCode | null) => {
    if (value) {
      setTranslationProcessSettingsSourceLanguage(value);
    }
  };

  const handleTargetLanguageChange = (value: LanguageCode | null) => {
    if (value) {
      setTranslationProcessSettingsTargetLanguage(value);
    }
  };

  const handleSwapLanguages = () => {
    setTranslationProcessSettingsSourceLanguage(targetLanguage);
    setTranslationProcessSettingsTargetLanguage(sourceLanguage);
  };

  return (
    <Group gap="xs" wrap="nowrap" data-testid={dataTestId}>
      <Tooltip label="Source language">
        <Select
          w={160}
          size="xs"
          searchable
          data={languages}
          value={sourceLanguage}
          onChange={handleSourceLanguageChange}
          data-testid={`${dataTestId}.SourceLanguageSelect`}
        />
      </Tooltip>
      <ActionIconWithTooltip
        size="md"
        label="Swap languages"
        onClick={handleSwapLanguages}
        data-testid={`${dataTestId}.SwapLanguagesButton`}
      >
        <IconArrowsDiff size={20} />
      </ActionIconWithTooltip>
      <Tooltip label="Target language">
        <Select
          w={160}
          size="xs"
          searchable
          data={languages}
          value={targetLanguage}
          onChange={handleTargetLanguageChange}
          data-testid={`${dataTestId}.TargetLanguageSelect`}
        />
      </Tooltip>
    </Group>
  );
};
