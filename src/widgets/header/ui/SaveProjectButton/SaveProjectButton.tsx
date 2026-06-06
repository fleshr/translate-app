import { selectResources, useTranslationStore } from "@/entities/translation";
import { stringifyJson } from "@/shared/lib/json";
import { selectProject, useProjectStore } from "@/shared/model/projectStore";
import {
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { fileSave } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";
import type { ProjectFile } from "../../model/projectFile";

export const SaveProjectButton = () => {
  const content = useIntlayer("SaveProjectButton");
  const isTranslating = useSessionStore(selectIsTranslating);

  const handleSaveProject = async () => {
    try {
      const project = selectProject(useProjectStore.getState());
      const resources = selectResources(useTranslationStore.getState());

      const projectFile: ProjectFile = { project, resources };
      const blob = new Blob([stringifyJson(projectFile)]);
      await fileSave(blob, { fileName: "translation.json" });

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
