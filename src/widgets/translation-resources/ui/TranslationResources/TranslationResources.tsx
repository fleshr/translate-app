import {
  selectBaseResources,
  useTranslationStore,
} from "@/entities/translation";
import { Stack } from "@mantine/core";
import { TranslationResourceButton } from "../TranslationResourceButton/TranslationResourceButton";

export const TranslationResources = () => {
  const resources = useTranslationStore(selectBaseResources);

  return (
    <Stack gap="xs" p="xs" data-testid="TranslationResources">
      <Stack gap={0} data-testid="TranslationResources.List">
        {resources.length > 0 &&
          resources.map((resource, index) => (
            <TranslationResourceButton
              key={resource.id}
              resource={resource}
              data-testid={`TranslationResources.Item.${index}`}
            />
          ))}
      </Stack>
    </Stack>
  );
};
