import { initTranslation } from "@/entities/translation";
import { resolveParser } from "@/shared/lib/parser";
import {
  initSession,
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { notifications } from "@mantine/notifications";
import { IconFileImport } from "@tabler/icons-react";
import { directoryOpen } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";
import { extractTranslations } from "../../lib/extractTranslations/extractTranslations";

export const ImportButton = () => {
  const content = useIntlayer("ImportButton");
  const isTranslating = useSessionStore(selectIsTranslating);

  const handleImportFiles = async () => {
    try {
      const parser = await resolveParser();

      if (!parser) {
        notifications.show({ message: content.parserNotFoundMessage });
        return;
      }

      const dirFiles = await directoryOpen({ recursive: true });
      const resources = await extractTranslations(dirFiles, parser);

      initSession(resources);
      initTranslation(resources);

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
