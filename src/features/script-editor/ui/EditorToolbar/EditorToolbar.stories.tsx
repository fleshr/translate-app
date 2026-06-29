import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorToolbar } from "./EditorToolbar";

const meta = {
  title: "features/script-editor/EditorToolbar",
  component: EditorToolbar,
} satisfies Meta<typeof EditorToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
