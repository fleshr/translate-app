import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { withHeight, withStoreState } from "@/shared/lib/storybook";
import { getLogsStoreStateMock } from "@/shared/mocks/logsStore";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useLogsStore } from "@/shared/model/logsStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomPanel } from "./BottomPanel";

const meta = {
  title: "widgets/bottom-panel/BottomPanel",
  component: BottomPanel,
  decorators: [
    withHeight(),
    withStoreState(useTranslationStore, getTranslationStoreStateMock()),
  ],
} satisfies Meta<typeof BottomPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LogsEmpty: Story = {
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("BottomPanel.LogsTab");
    await userEvent.click(tab);
    await userEvent.unhover(tab);
    tab.blur();
  },
};

export const LogsFilled: Story = {
  decorators: [withStoreState(useLogsStore, getLogsStoreStateMock())],
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("BottomPanel.LogsTab");
    await userEvent.click(tab);
    await userEvent.unhover(tab);
    tab.blur();
  },
};

export const SegmentEditor: Story = {
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("BottomPanel.SegmentEditorTab");
    await userEvent.click(tab);
    await userEvent.unhover(tab);
    tab.blur();
  },
};

export const SegmentEditorWithSelectedSegment: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({ selectedSegment: "segment-1" }),
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("BottomPanel.SegmentEditorTab");
    await userEvent.click(tab);
    await userEvent.unhover(tab);
    tab.blur();
  },
};

export const SegmentRaw: Story = {
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("BottomPanel.SegmentRawTab");
    await userEvent.click(tab);
    await userEvent.unhover(tab);
    tab.blur();
  },
};

export const SegmentRawWithSelectedSegment: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({ selectedSegment: "segment-1" }),
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("BottomPanel.SegmentRawTab");
    await userEvent.click(tab);
    await userEvent.unhover(tab);
    tab.blur();
  },
};
