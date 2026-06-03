import {
  selectBaseResources,
  useTranslationStore,
} from "@/entities/translation";
import {
  selectResourcesProgress,
  selectSelectedResource,
  selectTranslatingResource,
  setSessionSelectedResource,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { Stack } from "@mantine/core";
import { TranslationResourceButton } from "../TranslationResourceButton/TranslationResourceButton";

export const TranslationResources = () => {
  const resources = useTranslationStore(selectBaseResources);
  const progress = useSessionStore(selectResourcesProgress);
  const selectedResource = useSessionStore(selectSelectedResource);
  const translatingResource = useSessionStore(selectTranslatingResource);

  return (
    <Stack gap="xs" p="xs" data-testid="TranslationResources">
      <Stack gap={0} data-testid="TranslationResources.List">
        {resources.length > 0 &&
          resources.map((resource, index) => (
            <TranslationResourceButton
              key={resource.id}
              resource={resource}
              onSelect={setSessionSelectedResource}
              progress={progress[resource.id]}
              isSelected={resource.id === selectedResource}
              isProcessing={resource.id === translatingResource}
              data-testid={`TranslationResources.Item.${index}`}
            />
          ))}
      </Stack>
    </Stack>
  );
};
