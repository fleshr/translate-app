import {
  selectSelectedTranslator,
  setTranslatorConfig,
  translators,
  useTranslatorStore,
  type TranslatorConfig,
} from "@/entities/translator";
import { getComboboxItems } from "@/shared/lib/getComboboxItems";
import type { BaseProps } from "@/shared/model/component";
import { Button, Divider, ScrollArea, Select, Stack } from "@mantine/core";
import { useId, useState } from "react";
import { useIntlayer } from "react-intlayer";
import { TranslatorConfigForm } from "../TranslatorConfigForm/TranslatorConfigForm";

export const TranslatorSettings = (props: BaseProps) => {
  const { "data-testid": dataTestId = "TranslatorSettings" } = props;
  const formId = useId();
  const content = useIntlayer("TranslatorSettings");
  const selectedTranslator = useTranslatorStore(selectSelectedTranslator);
  const [activeTranslator, setActiveTranslator] = useState(selectedTranslator);
  const translator = translators[activeTranslator];
  const items = getComboboxItems(translators);

  const handleChange = (value: string | null) => {
    if (value) {
      setActiveTranslator(value);
    }
  };

  const handleSubmit = (values: TranslatorConfig) => {
    setTranslatorConfig(activeTranslator, values);
  };

  return (
    <Stack h="100%" data-testid="TranslatorSettings">
      <ScrollArea flex={1} mih={0}>
        <Stack>
          <Select
            label={content.translatorSelectLabel}
            description={content.translatorSelectDescription}
            data={items}
            value={activeTranslator}
            onChange={handleChange}
            data-testid={`${dataTestId}.TranslatorSelect`}
          />
          <Divider />
          {translator?.configForm && (
            <TranslatorConfigForm
              formId={formId}
              key={activeTranslator}
              translator={activeTranslator}
              configForm={translator.configForm}
              onSubmit={handleSubmit}
              data-testid={`${dataTestId}.TranslatorConfigForm`}
            />
          )}
        </Stack>
      </ScrollArea>
      <Button
        type="submit"
        form={formId}
        data-testid={`${dataTestId}.SaveButton`}
      >
        {content.saveButtonLabel}
      </Button>
    </Stack>
  );
};
