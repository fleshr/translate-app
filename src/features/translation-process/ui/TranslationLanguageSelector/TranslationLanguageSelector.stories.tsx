import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationLanguageSelector } from "./TranslationLanguageSelector";

const meta = {
  title: "features/translation-process/TranslationLanguageSelector",
  component: TranslationLanguageSelector,
} satisfies Meta<typeof TranslationLanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
