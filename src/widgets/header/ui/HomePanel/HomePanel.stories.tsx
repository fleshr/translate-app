import { withStoreState } from "@/shared/lib/storybook";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomePanel } from "./HomePanel";

const meta = {
  title: "widgets/header/HomePanel",
  component: HomePanel,
} satisfies Meta<typeof HomePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IsTranslating: Story = {
  decorators: [withStoreState(useSessionStore, { status: "translating" })],
};
