import { useTranslationProcessStore } from "@/features/translation-process";
import { getTranslationProcessStoreStateMock } from "@/features/translation-process/mocks";
import { withStoreState } from "@/shared/lib/storybook";
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
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock({ status: "translating" }),
    ),
  ],
};
