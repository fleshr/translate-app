import { withWidth } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { z } from "zod";
import { DynamicForm } from "./DynamicForm";

const meta = {
  title: "shared/DynamicForm",
  component: DynamicForm,
  decorators: [withWidth()],
} satisfies Meta<typeof DynamicForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fields: [
      { key: "test", type: "text", label: "test" },
      { key: "test2", type: "number", label: "test2" },
    ],
    schema: z.object({
      test: z.string(),
      test2: z.number(),
    }),
    initialValues: {
      test: "test",
      test2: 1,
    },
    onSubmit: fn(),
  },
};
