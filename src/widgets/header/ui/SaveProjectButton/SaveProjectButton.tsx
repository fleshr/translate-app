import { selectProject, useProjectStore } from "@/entities/project";
import {
  selectFiles,
  selectResources,
  useFilesStore,
  useTranslationStore,
} from "@/entities/translation";
import {
  selectIsTranslating,
  useTranslationProcessStore,
} from "@/features/translation-process";
import { projectFileExtension } from "@/shared/config/project";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { fileSave } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";
import { generateProjectFile } from "../../lib/generateProjectFile";

export const SaveProjectButton = () => {
  const content = useIntlayer("SaveProjectButton");
  const isTranslating = useTranslationProcessStore(selectIsTranslating);

  const handleSaveProject = async () => {
    try {
      const files = selectFiles(useFilesStore.getState());
      const project = selectProject(useProjectStore.getState());
      const resources = selectResources(useTranslationStore.getState());

      const projectFile = await generateProjectFile(files, project, resources);
      await fileSave(projectFile, {
        fileName: `project${projectFileExtension}`,
      });

      notifications.show({ message: content.savedMessage });
    } catch {
      notifications.show({ message: content.errorMessage });
    }
  };

  return (
    <ActionIconWithTooltip
      label={content.tooltipLabel}
      onClick={handleSaveProject}
      disabled={isTranslating}
      data-testid="SaveProjectButton"
    >
      <IconDeviceFloppy />
    </ActionIconWithTooltip>
  );
};
