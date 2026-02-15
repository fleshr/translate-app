import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsButton } from "./SettingsButton";

const meta = {
  title: "widgets/header/SettingsButton",
  component: SettingsButton,
} satisfies Meta<typeof SettingsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ModalOpened: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByTestId("SettingsButton");
    await userEvent.click(button);
  },
};
