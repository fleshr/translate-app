import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { withStoreState, withWidth } from "@/shared/lib/storybook";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationResources } from "./TranslationResources";

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
    withStoreState(useTranslationStore, getTranslationStoreStateMock()),
  ],
};

export const SelectedWithProgressing: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({
        selectedResource: "file-1",
        translatingResource: "file-1",
      }),
    ),
    withStoreState(useTranslationStore, getTranslationStoreStateMock()),
  ],
};
