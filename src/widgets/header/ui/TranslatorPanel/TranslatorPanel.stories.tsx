import { withStoreState } from "@/shared/lib/storybook";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslatorPanel } from "./TranslatorPanel";

const meta = {
  title: "widgets/header/TranslatorPanel",
  component: TranslatorPanel,
} satisfies Meta<typeof TranslatorPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IsTranslating: Story = {
  decorators: [
    withStoreState(useSessionStore, {
      status: "translating",
      translatingResource: "2",
      resourcesProgress: {
        "1": { done: 100, total: 100 },
        "2": { done: 50, total: 100 },
      },
    }),
  ],
};
