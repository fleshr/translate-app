import {
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconListSearch } from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";
import { SearchPanel } from "../SearchPanel/SearchPanel";

export const SearchButton = () => {
  const content = useIntlayer("SearchButton");
  const [opened, { open, close }] = useDisclosure(false);
  const isTranslating = useSessionStore(selectIsTranslating);

  return (
    <>
      <ActionIconWithTooltip
        onClick={open}
        disabled={isTranslating}
        label={content.tooltipLabel}
        data-testid="SearchButton"
      >
        <IconListSearch />
      </ActionIconWithTooltip>
      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        title={content.modalTitle}
      >
        <SearchPanel />
      </Modal>
    </>
  );
};
