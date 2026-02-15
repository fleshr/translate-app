import { translators } from "@/shared/constants/translators";
import { getComboboxItems } from "@/shared/lib/getComboboxItems";
import {
  selectSelectedTranslator,
  selectTranslatorConfig,
  setSettingsTranslatorConfig,
  useSettingsStore,
} from "@/shared/model/settingsStore";
import type { TranslatorConfig } from "@/shared/model/translator";
import { DynamicForm } from "@/shared/ui/DynamicForm";
import { Button, Divider, ScrollArea, Select, Stack } from "@mantine/core";
import { useId, useState } from "react";
import { useIntlayer } from "react-intlayer";

export const TranslatorSettings = () => {
  const formId = useId();
  const content = useIntlayer("TranslatorSettings");
  const selectedTranslator = useSettingsStore(selectSelectedTranslator);
  const [activeTranslator, setActiveTranslator] = useState(selectedTranslator);
  const translator = translators[activeTranslator];
  const storeConfig = useSettingsStore(
    selectTranslatorConfig(activeTranslator),
  );

  const items = getComboboxItems(translators);

  const handleChange = (value: string | null) => {
    if (value) {
      setActiveTranslator(value);
    }
  };

  const handleSubmit = (values: TranslatorConfig) => {
    setSettingsTranslatorConfig(activeTranslator, values);
  };

  return (
    <Stack h="100%" justify="space-between" data-testid="TranslatorSettings">
      <ScrollArea>
        <Stack>
          <Select
            label={content.translatorSelectLabel}
            description={content.translatorSelectDescription}
            data={items}
            value={activeTranslator}
            onChange={handleChange}
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
            />
          )}
        </Stack>
      </ScrollArea>
      <Button type="submit" form={formId}>
        {content.saveButtonLabel}
      </Button>
    </Stack>
  );
};
