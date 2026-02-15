import type { Meta, StoryObj } from "@storybook/react-vite";
import { GeneralSettings } from "./GeneralSettings";

const meta = {
  title: "widgets/header/GeneralSettings",
  component: GeneralSettings,
} satisfies Meta<typeof GeneralSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
