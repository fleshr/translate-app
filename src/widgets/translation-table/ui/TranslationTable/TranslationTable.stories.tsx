import { withStoreState } from "@/shared/lib/storybook";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { getTranslationStoreStateMock } from "@/shared/mocks/translationStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import { useTranslationStore } from "@/shared/model/translationStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationTable } from "./TranslationTable";

const meta = {
  title: "widgets/translation-table/TranslationTable",
  component: TranslationTable,
} satisfies Meta<typeof TranslationTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({ selectedResource: "file-1" }),
    ),
    withStoreState(useTranslationStore, getTranslationStoreStateMock()),
  ],
};

export const FilledWithSelectedSegment: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({
        selectedResource: "file-1",
        selectedSegment: "segment-3",
      }),
    ),
    withStoreState(useTranslationStore, getTranslationStoreStateMock()),
  ],
};
