import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslatorSettings } from "./TranslatorSettings";

const meta = {
  title: "widgets/header/TranslatorSettings",
  component: TranslatorSettings,
} satisfies Meta<typeof TranslatorSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
