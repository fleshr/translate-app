import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";
import { SettingsTabs } from "../SettingsTabs/SettingsTabs";

export const SettingsButton = () => {
  const content = useIntlayer("SettingsButton");
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIconWithTooltip
        onClick={open}
        label={content.tooltipLabel}
        data-testid="SettingsButton"
      >
        <IconSettings />
      </ActionIconWithTooltip>
      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        title={content.modalTitle}
      >
        <SettingsTabs />
      </Modal>
    </>
  );
};
