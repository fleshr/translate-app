import { resolveParser } from "@/entities/parser";
import { selectProjectParser, useProjectStore } from "@/entities/project";
import { initFiles, initTranslation } from "@/entities/translation";
import {
  selectIsTranslating,
  useTranslationProcessStore,
} from "@/features/translation-process";
import { initSession } from "@/shared/model/sessionStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { notifications } from "@mantine/notifications";
import { IconFileImport } from "@tabler/icons-react";
import { directoryOpen } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";
import { extractResources } from "../../lib/extractResources";
import { getResourcesFiles } from "../../lib/getResourcesFiles";

export const ImportButton = () => {
  const content = useIntlayer("ImportButton");
  const isTranslating = useTranslationProcessStore(selectIsTranslating);

  const handleImportFiles = async () => {
    try {
      const projectParser = selectProjectParser(useProjectStore.getState());
      const parser = await resolveParser(projectParser);

      if (!parser) {
        notifications.show({ message: content.parserNotFoundMessage });
        return;
      }

      const dirFiles = await directoryOpen({ recursive: true });
      const resources = await extractResources(dirFiles, parser);
      const files = await getResourcesFiles(dirFiles, resources);

      initFiles(files);
      initTranslation(resources);
      initSession(resources[0]?.id ?? null);

      notifications.show({ message: content.successMessage });
    } catch {
      notifications.show({ message: content.errorMessage });
    }
  };

  return (
    <ActionIconWithTooltip
      label={content.tooltipLabel}
      onClick={handleImportFiles}
      disabled={isTranslating}
      data-testid="ImportButton"
    >
      <IconFileImport />
    </ActionIconWithTooltip>
  );
};
