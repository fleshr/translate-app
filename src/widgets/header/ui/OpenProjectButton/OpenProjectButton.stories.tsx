import { withStoreState } from "@/shared/lib/storybook";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { OpenProjectButton } from "./OpenProjectButton";

const meta = {
  title: "widgets/header/OpenProjectButton",
  component: OpenProjectButton,
} satisfies Meta<typeof OpenProjectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTranslating: Story = {
  decorators: [withStoreState(useSessionStore, { status: "translating" })],
};
