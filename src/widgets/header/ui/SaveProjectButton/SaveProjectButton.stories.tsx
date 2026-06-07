import { useTranslationProcessStore } from "@/features/translation-process";
import { getTranslationProcessStoreStateMock } from "@/features/translation-process/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SaveProjectButton } from "./SaveProjectButton";

const meta = {
  title: "widgets/header/SaveProjectButton",
  component: SaveProjectButton,
} satisfies Meta<typeof SaveProjectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTranslating: Story = {
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock({ status: "translating" }),
    ),
  ],
};
