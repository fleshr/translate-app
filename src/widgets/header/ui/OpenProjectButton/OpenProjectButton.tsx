import { initProject, PROJECT_FILE_EXTENSION } from "@/entities/project";
import { initFiles, initTranslation } from "@/entities/translation";
import {
  selectIsTranslating,
  useTranslationProcessStore,
} from "@/features/translation-process";
import { initSession } from "@/shared/model/sessionStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { notifications } from "@mantine/notifications";
import { IconFolderOpen } from "@tabler/icons-react";
import { fileOpen } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";
import { parseProjectFile } from "../../lib/parseProjectFile";

export const OpenProjectButton = () => {
  const content = useIntlayer("OpenProjectButton");
  const isTranslating = useTranslationProcessStore(selectIsTranslating);

  const handleOpenProject = async () => {
    try {
      const projectFile = await fileOpen({
        extensions: [PROJECT_FILE_EXTENSION],
      });
      const { files, project, resources } = await parseProjectFile(projectFile);

      initFiles(files);
      initProject(project);
      initTranslation(resources);
      initSession(resources[0]?.id ?? null);

      notifications.show({ message: content.openedMessage });
    } catch {
      notifications.show({ message: content.errorMessage });
    }
  };

  return (
    <ActionIconWithTooltip
      label={content.tooltipLabel}
      onClick={handleOpenProject}
      disabled={isTranslating}
      data-testid="OpenProjectButton"
    >
      <IconFolderOpen />
    </ActionIconWithTooltip>
  );
};
