import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { getTranslationProcessStoreStateMock } from "../../mocks";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { TranslationProgress } from "./TranslationProgress";

const testStore = getTranslationStoreStateMock();
const testResource = testStore.resources.byId["file-1"]!;

const meta = {
  title: "features/translation-process/TranslationProgress",
  component: TranslationProgress,
  decorators: [withStoreState(useTranslationStore, testStore)],
} satisfies Meta<typeof TranslationProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutSegements: Story = {
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock(),
    ),
  ],
};

export const Full: Story = {
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock({
        translatingResource: testResource.id,
      }),
    ),
  ],
};
