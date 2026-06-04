import { resolveParser } from "@/entities/parser";
import { selectResources, useTranslationStore } from "@/entities/translation";
import {
  selectProjectParser,
  useProjectStore,
} from "@/shared/model/projectStore";
import {
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { notifications } from "@mantine/notifications";
import { IconFolderUp } from "@tabler/icons-react";
import { fileSave } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";
import { exportTranslationToZip } from "../../lib/exportTranslationToZip/exportTranslationToZip";

export const ExportButton = () => {
  const content = useIntlayer("ExportButton");
  const isTranslating = useSessionStore(selectIsTranslating);

  const handleSaveProject = async () => {
    try {
      const projectParser = selectProjectParser(useProjectStore.getState());
      const parser = await resolveParser(projectParser);

      if (!parser) {
        notifications.show({ message: content.parserNotFoundMessage });
        return;
      }

      const resources = selectResources(useTranslationStore.getState());
      const blob = await exportTranslationToZip(resources, parser);

      await fileSave(blob, { fileName: "translation.zip" });

      notifications.show({ message: content.successMessage });
    } catch {
      notifications.show({ message: content.errorMessage });
    }
  };

  return (
    <ActionIconWithTooltip
      label={content.tooltipLabel}
      onClick={handleSaveProject}
      disabled={isTranslating}
      data-testid="ExportButton"
    >
      <IconFolderUp />
    </ActionIconWithTooltip>
  );
};
