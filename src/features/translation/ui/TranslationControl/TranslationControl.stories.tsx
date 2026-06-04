import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationControl } from "./TranslationControl";

const testStore = getTranslationStoreStateMock();
const testResource = testStore.resources.byId["file-1"]!;

const meta = {
  title: "features/translation/TranslationControl",
  component: TranslationControl,
  decorators: [withStoreState(useTranslationStore, testStore)],
} satisfies Meta<typeof TranslationControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Translating: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({
        status: "translating",
        translatingResource: testResource.id,
      }),
    ),
  ],
};
