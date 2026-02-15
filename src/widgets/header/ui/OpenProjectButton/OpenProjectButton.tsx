import { readFile } from "@/shared/lib/file";
import { parseJson } from "@/shared/lib/json";
import { ProjectSchema } from "@/shared/model/project";
import { initProject } from "@/shared/model/projectStore";
import {
  initSession,
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { initTranslation } from "@/shared/model/translationStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { notifications } from "@mantine/notifications";
import { IconFolderOpen } from "@tabler/icons-react";
import { fileOpen } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";

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
      const { resources, ...project } = ProjectSchema.parse(parseJson(json));

      initProject(project);
      initSession(resources);
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
