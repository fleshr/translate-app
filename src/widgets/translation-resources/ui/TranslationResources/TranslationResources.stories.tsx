import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { getTranslationProcessStoreStateMock } from "@/features/translation-process/mocks";
import { withStoreState, withWidth } from "@/shared/lib/storybook";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationResources } from "./TranslationResources";

const testStore = getTranslationStoreStateMock();
const testResource = testStore.resources.byId["file-1"]!;

const meta = {
  title: "widgets/translation-resources/TranslationResources",
  component: TranslationResources,
  decorators: [withWidth()],
} satisfies Meta<typeof TranslationResources>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithProgress: Story = {
  decorators: [
    withStoreState(useSessionStore, getSessionStoreStateMock()),
    withStoreState(useTranslationStore, testStore),
  ],
};

export const SelectedWithProgressing: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({ selectedResource: testResource.id }),
    ),
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock({
        translatingResource: testResource.id,
      }),
    ),
    withStoreState(useTranslationStore, testStore),
  ],
};
