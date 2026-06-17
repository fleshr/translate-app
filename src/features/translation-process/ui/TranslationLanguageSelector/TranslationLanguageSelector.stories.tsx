import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { getTranslationProcessStoreStateMock } from "../../mocks";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { TranslationLanguageSelector } from "./TranslationLanguageSelector";

const meta = {
  title: "features/translation-process/TranslationLanguageSelector",
  component: TranslationLanguageSelector,
} satisfies Meta<typeof TranslationLanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Translating: Story = {
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock({ status: "translating" }),
    ),
  ],
};
