import { withStoreState } from "@/shared/lib/storybook";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { getTranslationStoreStateMock } from "@/shared/mocks/translationStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import { useTranslationStore } from "@/shared/model/translationStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectedSegmentEditor } from "./SelectedSegmentEditor";

const meta = {
  title: "widgets/bottom-panel/SelectedSegmentEditor",
  component: SelectedSegmentEditor,
  decorators: [
    withStoreState(useTranslationStore, getTranslationStoreStateMock()),
  ],
} satisfies Meta<typeof SelectedSegmentEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({
        selectedSegment: "segment-1",
      }),
    ),
  ],
};

export const IsTranslating: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({
        status: "translating",
        selectedSegment: "segment-1",
      }),
    ),
  ],
};

export const NoSelectedSegment: Story = {};
