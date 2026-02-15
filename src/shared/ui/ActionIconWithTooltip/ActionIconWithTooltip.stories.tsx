import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionIconWithTooltip } from "./ActionIconWithTooltip";

const meta = {
  title: "shared/ActionIconWithTooltip",
  component: ActionIconWithTooltip,
} satisfies Meta<typeof ActionIconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "B",
    label: "Tooltip",
  },
};
