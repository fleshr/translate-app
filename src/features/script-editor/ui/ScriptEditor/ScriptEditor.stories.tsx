import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScriptEditor } from "./ScriptEditor";

const meta = {
  title: "features/script-editor/ScriptEditor",
  component: ScriptEditor,
} satisfies Meta<typeof ScriptEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
