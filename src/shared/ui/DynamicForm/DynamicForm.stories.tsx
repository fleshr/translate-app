import { withWidth } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
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
    formId: "test",
    fields: [
      {
        key: "text",
        type: "text",
        label: "Text field",
        description: "Text description",
      },
      {
        key: "number",
        type: "number",
        label: "Number field",
        description: "Number description",
      },
      {
        key: "textarea",
        type: "textarea",
        label: "Textarea field",
        description: "Textarea description",
      },
      {
        key: "select",
        type: "select",
        label: "Select field",
        description: "Select description",
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
        ],
      },
    ],
    schema: z.object({
      text: z.string().min(3),
      number: z.number(),
      textarea: z.string(),
      select: z.string(),
    }),
    initialValues: {
      text: "test",
      number: 100,
      textarea: "very\nlong\ntext",
      select: "option1",
    },
  },
};
