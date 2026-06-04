import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectedSegmentRawJson } from "./SelectedSegmentRawJson";

const meta = {
  title: "widgets/bottom-panel/SelectedSegmentRawJson",
  component: SelectedSegmentRawJson,
} satisfies Meta<typeof SelectedSegmentRawJson>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({ selectedSegment: "segment-1" }),
    ),
    withStoreState(useTranslationStore, getTranslationStoreStateMock()),
  ],
};

export const NoSelectedSegment: Story = {};
