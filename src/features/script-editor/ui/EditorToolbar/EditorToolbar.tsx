import {
  selectSegments,
  setTranslationSegments,
  useTranslationStore,
} from "@/entities/translation";
import type { BaseProps } from "@/shared/model/component";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { Divider, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconBug,
  IconDeviceFloppy,
  IconFolderOpen,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { fileOpen, fileSave } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";
import { applyFunctionToSegments } from "../../lib/applyFunctionToSegments";
import { parseFuntionFromCode } from "../../lib/parseFuntionFromCode";
import { setUserScriptCode } from "../../model/scriptStore/actions";
import { selectCode } from "../../model/scriptStore/selectors";
import { useUserScriptStore } from "../../model/scriptStore/store";

export const EditorToolbar = (props: BaseProps) => {
  const { "data-testid": dataTestId = "EditorToolbar" } = props;
  const content = useIntlayer("EditorToolbar");

  const handleOpenScript = async () => {
    try {
      const sctiptFile = await fileOpen({ mimeTypes: ["text/javascript"] });
      const userCode = await sctiptFile.text();

      setUserScriptCode(userCode);
      notifications.show({ message: content.openMessage });
    } catch {
      notifications.show({ message: content.openErrorMessage });
    }
  };

  const handleSaveScript = async () => {
    try {
      const code = selectCode(useUserScriptStore.getState());
      await fileSave(new Blob([code]), { fileName: "script.js" });
      notifications.show({ message: content.saveMessage });
    } catch {
      notifications.show({ message: content.saveErrorMessage });
    }
  };

  const handleExecuteScript = async () => {
    try {
      const userCode = selectCode(useUserScriptStore.getState());
      const changedSegments = await applyFunctionToSegments(
        selectSegments(useTranslationStore.getState()),
        parseFuntionFromCode(userCode),
      );

      setTranslationSegments(changedSegments);
      notifications.show({ message: content.executeMessage });
    } catch {
      notifications.show({ message: content.executeErrorMessage });
    }
  };

  return (
    <Group gap="xs" data-testid={dataTestId}>
      <ActionIconWithTooltip
        data-testid={`${dataTestId}.OpenScriptButton`}
        onClick={handleOpenScript}
        label={content.openLabel}
        variant="default"
        size="md"
      >
        <IconFolderOpen size={18} />
      </ActionIconWithTooltip>
      <ActionIconWithTooltip
        data-testid={`${dataTestId}.SaveScriptButton`}
        onClick={handleSaveScript}
        label={content.saveLabel}
        variant="default"
        size="md"
      >
        <IconDeviceFloppy size={18} />
      </ActionIconWithTooltip>
      <Divider orientation="vertical" />
      <ActionIconWithTooltip
        data-testid={`${dataTestId}.ExecuteScriptButton`}
        label={content.executeLabel}
        variant="default"
        size="md"
        onClick={handleExecuteScript}
      >
        <IconPlayerPlay size={18} />
      </ActionIconWithTooltip>
      <ActionIconWithTooltip
        data-testid={`${dataTestId}.DebugScriptButton`}
        label={content.debugLabel}
        variant="default"
        size="md"
        disabled
      >
        <IconBug size={18} />
      </ActionIconWithTooltip>
    </Group>
  );
};
