import { readFile } from "@/shared/lib/file";
import type { TranslationSegment } from "@/shared/model/translation";
import {
  selectSegments,
  setTranslationSegments,
  useTranslationStore,
} from "@/shared/model/translationStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { javascript } from "@codemirror/lang-javascript";
import { Divider, Group, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconBug,
  IconDeviceFloppy,
  IconFolderOpen,
  IconPlayerPlay,
} from "@tabler/icons-react";
import CodeMirror from "@uiw/react-codemirror";
import { fileOpen, fileSave } from "browser-fs-access";
import { createDraft, finishDraft } from "immer";
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { isDeepEqual } from "remeda";
import { UserFunctionSchema } from "../../model/userFunction";

const defaultCode = `return async function script(segment) {
  console.log("Hello, world!");
}`;

export const ScriptEditor = () => {
  const content = useIntlayer("ScriptEditor");
  const [userCode, setUserCode] = useState(defaultCode);

  const handleSaveScript = async () => {
    await fileSave(new Blob([userCode]), { fileName: "script.js" });
    notifications.show({ message: content.savedMessage });
  };

  const handleOpenScript = async () => {
    const sctiptFile = await fileOpen({
      mimeTypes: ["text/javascript"],
    });

    const userCode = await readFile(sctiptFile);

    setUserCode(userCode);
    notifications.show({ message: content.openedMessage });
  };

  const handleRunScript = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-implied-eval
      const userFunction = UserFunctionSchema.parse(new Function(userCode)());
      const segments = selectSegments(useTranslationStore.getState());
      const changedSegments: TranslationSegment[] = [];

      for (const segment of segments) {
        const draft = createDraft(segment);
        await userFunction(draft);
        const editedSegment = finishDraft(draft);

        if (!isDeepEqual(segment, editedSegment)) {
          changedSegments.push(editedSegment);
        }
      }

      setTranslationSegments(changedSegments);
      notifications.show({ message: content.executedMessage });
    } catch {
      notifications.show({ message: content.errorMessage });
    }
  };

  return (
    <Stack gap={0} data-testid="ScriptEditor">
      <Group p="xs" gap="xs">
        <ActionIconWithTooltip
          data-testid="ScriptEditor.OpenScriptButton"
          onClick={handleOpenScript}
          label="Open script"
          variant="default"
          size="md"
        >
          <IconFolderOpen size={18} />
        </ActionIconWithTooltip>
        <ActionIconWithTooltip
          data-testid="ScriptEditor.SaveScriptButton"
          onClick={handleSaveScript}
          label="Save script"
          variant="default"
          size="md"
        >
          <IconDeviceFloppy size={18} />
        </ActionIconWithTooltip>
        <Divider orientation="vertical" />
        <ActionIconWithTooltip
          data-testid="ScriptEditor.RunScriptButton"
          label="Run script"
          variant="default"
          size="md"
          onClick={handleRunScript}
        >
          <IconPlayerPlay size={18} />
        </ActionIconWithTooltip>
        <ActionIconWithTooltip
          data-testid="ScriptEditor.DebugScriptButton"
          label="Debug script"
          variant="default"
          size="md"
        >
          <IconBug size={18} />
        </ActionIconWithTooltip>
      </Group>
      <CodeMirror
        theme="dark"
        height="60dvh"
        value={userCode}
        onChange={setUserCode}
        extensions={[javascript()]}
        style={{ fontSize: "14px" }}
        data-testid="ScriptEditor.CodeContainer"
      />
    </Stack>
  );
};
