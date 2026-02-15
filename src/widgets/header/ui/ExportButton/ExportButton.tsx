import { createParserFromCode } from "@/shared/lib/module";
import { selectModule, useModuleStore } from "@/shared/model/moduleStore";
import {
  selectProjectParser,
  useProjectStore,
} from "@/shared/model/projectStore";
import {
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import {
  selectResources,
  useTranslationStore,
} from "@/shared/model/translationStore";
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
      const selectedParser = selectProjectParser(useProjectStore.getState());
      const parserMeta = selectModule(
        "parsers",
        selectedParser,
      )(useModuleStore.getState());

      if (!parserMeta) {
        notifications.show({ message: content.parserNotFoundMessage });
        return;
      }

      const resources = selectResources(useTranslationStore.getState());
      const parser = await createParserFromCode(parserMeta.code);
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
