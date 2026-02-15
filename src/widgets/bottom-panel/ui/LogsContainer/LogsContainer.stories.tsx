import { withLoggerMessages, withWidth } from "@/shared/lib/storybook";
import {
  mockDebugMessage,
  mockErrorMessage,
  mockInfoMessage,
} from "@/shared/mocks/logger";
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
  decorators: [
    withLoggerMessages([mockInfoMessage, mockDebugMessage, mockErrorMessage]),
  ],
};
