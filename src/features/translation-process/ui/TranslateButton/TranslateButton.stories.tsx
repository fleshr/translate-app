import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { getTranslationProcessStoreStateMock } from "../../mocks";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { TranslateButton } from "./TranslateButton";

const meta = {
  title: "features/translation-process/TranslateButton",
  component: TranslateButton,
} satisfies Meta<typeof TranslateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock(),
    ),
  ],
};

export const Translating: Story = {
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock({ status: "translating" }),
    ),
  ],
};
