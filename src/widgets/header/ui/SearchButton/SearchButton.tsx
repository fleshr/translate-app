import { SearchPanel } from "@/features/search";
import {
  selectIsTranslating,
  useTranslationProcessStore,
} from "@/features/translation-process";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconListSearch } from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";

export const SearchButton = () => {
  const content = useIntlayer("SearchButton");
  const [opened, { open, close }] = useDisclosure(false);
  const isTranslating = useTranslationProcessStore(selectIsTranslating);

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
