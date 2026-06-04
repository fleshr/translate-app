import {
  selectSelectedTranslator,
  setSelectedTranslator,
  translators,
  useTranslatorStore,
} from "@/entities/translator";
import { getComboboxItems } from "@/shared/lib/getComboboxItems";
import {
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";

import { Select, Tooltip } from "@mantine/core";
import { useIntlayer } from "react-intlayer";

export const TranslatorSelect = () => {
  const content = useIntlayer("TranslatorSelect");
  const isTranslating = useSessionStore(selectIsTranslating);
  const selectedTranslator = useTranslatorStore(selectSelectedTranslator);

  const handleChange = (value: string | null) => {
    if (value) {
      setSelectedTranslator(value);
    }
  };

  const items = getComboboxItems(translators);

  return (
    <Tooltip label={content.selectTooltipLabel}>
      <Select
        size="xs"
        miw={190}
        data={items}
        onChange={handleChange}
        disabled={isTranslating}
        defaultValue={selectedTranslator}
        data-testid="TranslatorSelect"
      />
    </Tooltip>
  );
};
