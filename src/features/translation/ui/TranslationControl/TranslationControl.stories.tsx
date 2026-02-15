import { withStoreState } from "@/shared/lib/storybook";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationControl } from "./TranslationControl";

const meta = {
  title: "features/translation/TranslationControl",
  component: TranslationControl,
} satisfies Meta<typeof TranslationControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Translating: Story = {
  decorators: [
    withStoreState(useSessionStore, {
      status: "translating",
      translatingResource: "2",
      resourcesProgress: {
        "1": {
          done: 100,
          total: 100,
        },
        "2": {
          done: 50,
          total: 100,
        },
      },
    }),
  ],
};
