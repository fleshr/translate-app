import {
  Button,
  Select,
  Stack,
  useMantineColorScheme,
  type ComboboxItem,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useIntlayer, useLocale } from "react-intlayer";
import {
  GeneralSettingsFormSchema,
  type GeneralSettingsFormValues,
} from "../../model/generalSettingsForm";

const locales = ["en", "ru"] as const;
const colorSchemes = ["light", "dark", "auto"] as const;

export const GeneralSettings = () => {
  const content = useIntlayer("GeneralSettings");
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { locale, setLocale } = useLocale();

  const languages = locales.map<ComboboxItem>((locale) => ({
    label: content.languageLabels[locale].value,
    value: locale,
  }));

  const themes = colorSchemes.map<ComboboxItem>((colorScheme) => ({
    label: content.themeLabels[colorScheme].value,
    value: colorScheme,
  }));

  const form = useForm<GeneralSettingsFormValues>({
    validate: schemaResolver(GeneralSettingsFormSchema, { sync: true }),
    initialValues: {
      theme: colorScheme,
      language: locale,
    },
  });

  const onSubmit = form.onSubmit((values) => {
    const { theme, language } = values;

    setColorScheme(theme);
    setLocale(language);
  });

  return (
    <form
      onSubmit={onSubmit}
      style={{ height: "100%" }}
      data-testid="GeneralSettings"
    >
      <Stack h="100%" gap="xl" justify="space-between">
        <Stack>
          <Select
            data={themes}
            label={content.themeSelectLabel}
            data-testid="GeneralSettings.ThemeSelect"
            key={form.key("theme")}
            {...form.getInputProps("theme")}
          />
          <Select
            data={languages}
            label={content.languageSelectLabel}
            data-testid="GeneralSettings.LanguageSelect"
            key={form.key("language")}
            {...form.getInputProps("language")}
          />
        </Stack>
        <Button type="submit" data-testid="GeneralSettings.SaveButton">
          {content.saveButtonLabel}
        </Button>
      </Stack>
    </form>
  );
};
