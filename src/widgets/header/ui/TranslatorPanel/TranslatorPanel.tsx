import { TranslationControl } from "@/features/translation";
import { Divider, Group, Tooltip } from "@mantine/core";
import { TranslatorSelect } from "../TranslatorSelect/TranslatorSelect";

export const TranslatorPanel = () => {
  return (
    <Tooltip.Group>
      <Group gap="xs">
        <TranslatorSelect />
        <Divider orientation="vertical" />
        <TranslationControl />
      </Group>
    </Tooltip.Group>
  );
};
