import {
  TranslationControls,
  TranslationLanguageSelector,
} from "@/features/translation-process";
import { Divider, Group, Tooltip } from "@mantine/core";
import { TranslatorSelect } from "../TranslatorSelect/TranslatorSelect";

export const TranslatorPanel = () => {
  return (
    <Tooltip.Group>
      <Group gap="xs" wrap="nowrap">
        <TranslatorSelect />
        <Divider orientation="vertical" />
        <TranslationLanguageSelector />
        <Divider orientation="vertical" />
        <TranslationControls />
      </Group>
    </Tooltip.Group>
  );
};
