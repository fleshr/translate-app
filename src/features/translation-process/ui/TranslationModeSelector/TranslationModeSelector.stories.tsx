import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { getTranslationProcessStoreStateMock } from "../../mocks";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { TranslationModeSelector } from "./TranslationModeSelector";

const meta = {
  title: "features/translation-process/TranslationModeSelector",
  component: TranslationModeSelector,
} satisfies Meta<typeof TranslationModeSelector>;

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

export const Opened: Story = {
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock(),
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByTestId("TranslationModeSelector");
    await userEvent.click(button);
    await userEvent.unhover(button);
  },
};
