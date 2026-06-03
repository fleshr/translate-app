import { initTranslation } from "@/entities/translation";
import { readFile } from "@/shared/lib/file";
import { parseJson } from "@/shared/lib/json";
import { initProject } from "@/shared/model/projectStore";
import {
  initSession,
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { notifications } from "@mantine/notifications";
import { IconFolderOpen } from "@tabler/icons-react";
import { fileOpen } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";
import { ProjectFileSchema } from "../../model/projectFile";

export const OpenProjectButton = () => {
  const content = useIntlayer("OpenProjectButton");
  const isTranslating = useSessionStore(selectIsTranslating);

  const handleOpenProject = async () => {
    try {
      const translationFile = await fileOpen({
        mimeTypes: ["application/json"],
        extensions: [".json"],
      });

      const json = await readFile(translationFile);
      const { project, resources } = ProjectFileSchema.parse(parseJson(json));

      initProject(project);
      initSession(resources[0]?.id ?? null);
      initTranslation(resources);

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
