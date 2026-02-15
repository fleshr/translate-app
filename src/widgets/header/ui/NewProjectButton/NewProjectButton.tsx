import {
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFileSpark } from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";
import { CreateProjectForm } from "../CreateProjectForm/CreateProjectForm";

export const NewProjectButton = () => {
  const content = useIntlayer("NewProjectButton");
  const [opened, { open, close }] = useDisclosure(false);
  const isTranslating = useSessionStore(selectIsTranslating);

  return (
    <>
      <ActionIconWithTooltip
        onClick={open}
        label={content.tooltipLabel}
        disabled={isTranslating}
        data-testid="NewProjectButton"
      >
        <IconFileSpark />
      </ActionIconWithTooltip>
      <Modal opened={opened} onClose={close} title={content.modalTitle}>
        <CreateProjectForm onSubmit={close} onCancel={close} />
      </Modal>
    </>
  );
};
