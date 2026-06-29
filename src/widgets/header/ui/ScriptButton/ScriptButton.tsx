import { ScriptEditor } from "@/features/script-editor";
import {
  selectIsTranslating,
  useTranslationProcessStore,
} from "@/features/translation-process";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCode, IconX } from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";
import classes from "./ScriptButton.module.css";

export const ScriptButton = () => {
  const content = useIntlayer("ScriptButton");
  const [opened, { open, close }] = useDisclosure(false);
  const isTranslating = useTranslationProcessStore(selectIsTranslating);

  return (
    <>
      <ActionIconWithTooltip
        label={content.tooltipLabel}
        onClick={open}
        disabled={isTranslating}
        data-testid="ScriptButton"
      >
        <IconCode />
      </ActionIconWithTooltip>
      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        classNames={{ body: classes.modalBody }}
        data-testid="ScriptButton.Modal"
      >
        <ScriptEditor />
        <ActionIconWithTooltip
          label="Close"
          variant="default"
          size="md"
          onClick={close}
          className={classes.closeButton}
        >
          <IconX size={18} />
        </ActionIconWithTooltip>
      </Modal>
    </>
  );
};
