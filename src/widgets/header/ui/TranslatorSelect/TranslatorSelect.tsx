import { translators } from "@/shared/constants/translators";
import { getComboboxItems } from "@/shared/lib/getComboboxItems";
import {
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import {
  selectSelectedTranslator,
  setSettingsSelectedTranslator,
  useSettingsStore,
} from "@/shared/model/settingsStore";
import { Select, Tooltip } from "@mantine/core";
import { useIntlayer } from "react-intlayer";

export const TranslatorSelect = () => {
  const content = useIntlayer("TranslatorSelect");
  const isTranslating = useSessionStore(selectIsTranslating);
  const selectedTranslator = useSettingsStore(selectSelectedTranslator);

  const handleChange = (value: string | null) => {
    if (value) {
      setSettingsSelectedTranslator(value);
    }
  };

  const items = getComboboxItems(translators);

  return (
    <Tooltip label={content.selectTooltipLabel}>
      <Select
        size="xs"
        data={items}
        onChange={handleChange}
        disabled={isTranslating}
        defaultValue={selectedTranslator}
        data-testid="TranslatorSelect"
      />
    </Tooltip>
  );
};
