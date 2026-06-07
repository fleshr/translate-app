import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { getTranslationProcessStoreStateMock } from "@/features/translation-process/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslatorPanel } from "./TranslatorPanel";

const testStore = getTranslationStoreStateMock();
const testResource = testStore.resources.byId["file-1"]!;

const meta = {
  title: "widgets/header/TranslatorPanel",
  component: TranslatorPanel,
  decorators: [withStoreState(useTranslationStore, testStore)],
} satisfies Meta<typeof TranslatorPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IsTranslating: Story = {
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock({
        status: "translating",
        translatingResource: testResource.id,
      }),
    ),
  ],
};
