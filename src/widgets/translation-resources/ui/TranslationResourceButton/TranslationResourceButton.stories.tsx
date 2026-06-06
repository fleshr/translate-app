import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { getTranslationProcessStoreStateMock } from "@/features/translation-process/mocks";
import { withStoreState, withWidth } from "@/shared/lib/storybook";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationResourceButton } from "./TranslationResourceButton";

const testStore = getTranslationStoreStateMock();
const testResource = testStore.resources.byId["file-1"]!;

const meta = {
  title: "widgets/translation-resources/TranslationResourceButton",
  component: TranslationResourceButton,
  args: { resource: testResource },
  decorators: [withWidth(), withStoreState(useTranslationStore, testStore)],
} satisfies Meta<typeof TranslationResourceButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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
  ],
};
