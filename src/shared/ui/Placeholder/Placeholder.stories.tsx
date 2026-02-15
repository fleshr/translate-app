import { withWidth } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Placeholder } from "./Placeholder";

const meta = {
  title: "shared/Placeholder",
  component: Placeholder,
  decorators: [withWidth()],
  args: { text: "Placeholder text" },
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubtext: Story = {
  args: { subtext: "Placeholder subtext" },
};
