import { withStoreState, withWidth } from "@/shared/lib/storybook";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslatorSelect } from "./TranslatorSelect";

const meta = {
  title: "widgets/header/TranslatorSelect",
  component: TranslatorSelect,
  decorators: [withWidth(180)],
} satisfies Meta<typeof TranslatorSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IsTranslating: Story = {
  decorators: [withStoreState(useSessionStore, { status: "translating" })],
};
