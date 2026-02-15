import { withStoreState } from "@/shared/lib/storybook";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScriptButton } from "./ScriptButton";

const meta = {
  title: "widgets/header/ScriptButton",
  component: ScriptButton,
} satisfies Meta<typeof ScriptButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTranslating: Story = {
  decorators: [withStoreState(useSessionStore, { status: "translating" })],
};

export const ModalOpened: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByTestId("ScriptButton");
    await userEvent.click(button);
  },
};
