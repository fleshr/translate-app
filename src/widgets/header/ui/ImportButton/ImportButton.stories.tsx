import { withStoreState } from "@/shared/lib/storybook";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ImportButton } from "./ImportButton";

const meta = {
  title: "widgets/header/ImportButton",
  component: ImportButton,
} satisfies Meta<typeof ImportButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTranslating: Story = {
  decorators: [withStoreState(useSessionStore, { status: "translating" })],
};
