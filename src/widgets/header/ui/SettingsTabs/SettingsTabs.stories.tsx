import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsTabs } from "./SettingsTabs";

const meta = {
  title: "widgets/header/SettingsTabs",
  component: SettingsTabs,
} satisfies Meta<typeof SettingsTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TranslatorTab: Story = {
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("SettingsTabs.TranslatorTab");
    await userEvent.click(tab);
  },
};

export const ParsersTab: Story = {
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("SettingsTabs.ParsersTab");
    await userEvent.click(tab);
  },
};
