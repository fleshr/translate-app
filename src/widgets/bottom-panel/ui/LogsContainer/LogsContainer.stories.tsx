import { withStoreState, withWidth } from "@/shared/lib/storybook";
import { getLogsStoreStateMock } from "@/shared/mocks/logsStore";
import { useLogsStore } from "@/shared/model/logsStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogsContainer } from "./LogsContainer";

const meta = {
  title: "widgets/bottom-panel/LogsContainer",
  component: LogsContainer,
  decorators: [withWidth()],
} satisfies Meta<typeof LogsContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  decorators: [withStoreState(useLogsStore, getLogsStoreStateMock())],
};
