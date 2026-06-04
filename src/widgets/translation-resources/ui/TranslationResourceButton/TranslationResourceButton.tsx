import {
  selectSegmentsProgress,
  useTranslationStore,
  type TranslationBaseResource,
} from "@/entities/translation";
import type { BaseProps } from "@/shared/model/component";
import {
  selectSelectedResource,
  selectTranslatingResource,
  setSessionSelectedResource,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { ProgressButton } from "@/shared/ui/ProgressButton";

interface TranslationResourceButtonProps {
  resource: TranslationBaseResource;
}

export const TranslationResourceButton = (
  props: BaseProps<TranslationResourceButtonProps>,
) => {
  const { resource, "data-testid": dataTestId = "TranslationResourceButton" } =
    props;
  const selectedResource = useSessionStore(selectSelectedResource);
  const translatingResource = useSessionStore(selectTranslatingResource);
  const progress = useTranslationStore(selectSegmentsProgress(resource.id));

  const handleButtonClick = () => {
    setSessionSelectedResource(resource.id);
  };

  return (
    <ProgressButton
      progress={progress}
      label={resource.name}
      onClick={handleButtonClick}
      isSelected={resource.id === selectedResource}
      isProcessing={resource.id === translatingResource}
      data-testid={dataTestId}
    />
  );
};
