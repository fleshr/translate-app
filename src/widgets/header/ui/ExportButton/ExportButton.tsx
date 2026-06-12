import { resolveParser } from "@/entities/parser";
import { selectResources, useTranslationStore } from "@/entities/translation";
import {
  selectIsTranslating,
  useTranslationProcessStore,
} from "@/features/translation-process";
import { selectFiles, useFilesStore } from "@/shared/model/filesStore";
import {
  selectProjectParser,
  useProjectStore,
} from "@/shared/model/projectStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { notifications } from "@mantine/notifications";
import { IconFolderUp } from "@tabler/icons-react";
import { fileSave } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";
import { exportResourcesToZip } from "../../lib/exportResourcesToZip";

export const ExportButton = () => {
  const content = useIntlayer("ExportButton");
  const isTranslating = useTranslationProcessStore(selectIsTranslating);

  const handleExportFiles = async () => {
    try {
      const projectParser = selectProjectParser(useProjectStore.getState());
      const parser = await resolveParser(projectParser);

      if (!parser) {
        notifications.show({ message: content.parserNotFoundMessage });
        return;
      }

      const files = selectFiles(useFilesStore.getState());
      const resources = selectResources(useTranslationStore.getState());
      const resourcesZip = await exportResourcesToZip(resources, files, parser);

      await fileSave(resourcesZip, { fileName: "translation.zip" });

      notifications.show({ message: content.successMessage });
    } catch {
      notifications.show({ message: content.errorMessage });
    }
  };

  return (
    <ActionIconWithTooltip
      label={content.tooltipLabel}
      onClick={handleExportFiles}
      disabled={isTranslating}
      data-testid="ExportButton"
    >
      <IconFolderUp />
    </ActionIconWithTooltip>
  );
};
