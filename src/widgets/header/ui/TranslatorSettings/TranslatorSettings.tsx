import {
  selectSelectedTranslator,
  selectTranslatorConfig,
  setTranslatorConfig,
  translators,
  useTranslatorStore,
  type TranslatorConfig,
} from "@/entities/translator";
import { getComboboxItems } from "@/shared/lib/getComboboxItems";
import { DynamicForm } from "@/shared/ui/DynamicForm";
import { Button, Divider, ScrollArea, Select, Stack } from "@mantine/core";
import { useId, useState } from "react";
import { useIntlayer } from "react-intlayer";

export const TranslatorSettings = () => {
  const formId = useId();
  const content = useIntlayer("TranslatorSettings");
  const selectedTranslator = useTranslatorStore(selectSelectedTranslator);
  const [activeTranslator, setActiveTranslator] = useState(selectedTranslator);
  const translator = translators[activeTranslator];
  const storeConfig = useTranslatorStore(
    selectTranslatorConfig(activeTranslator),
  );

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
            data-testid="TranslatorSettings.TranslatorSelect"
          />
          <Divider />
          {translator && (
            <DynamicForm
              formId={formId}
              key={activeTranslator}
              fields={translator.configFields}
              schema={translator.configSchema}
              initialValues={storeConfig}
              onSubmit={handleSubmit}
              data-testid="TranslatorSettings.DynamicForm"
            />
          )}
        </Stack>
      </ScrollArea>
      <Button
        type="submit"
        form={formId}
        data-testid="TranslatorSettings.SaveButton"
      >
        {content.saveButtonLabel}
      </Button>
    </Stack>
  );
};
