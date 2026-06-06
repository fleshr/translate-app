import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { getTranslationProcessStoreStateMock } from "../../mocks";
import { useTranslationProcessStore } from "../../model/processStore/store";
import { TranslationControls } from "./TranslationControls";

const testStore = getTranslationStoreStateMock();
const testResource = testStore.resources.byId["file-1"]!;

const meta = {
  title: "features/translation-process/TranslationControls",
  component: TranslationControls,
  decorators: [withStoreState(useTranslationStore, testStore)],
} satisfies Meta<typeof TranslationControls>;

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
      getTranslationProcessStoreStateMock({
        status: "translating",
        translatingResource: testResource.id,
      }),
    ),
  ],
};
