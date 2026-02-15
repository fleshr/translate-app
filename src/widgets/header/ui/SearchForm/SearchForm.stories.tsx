import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SearchForm } from "./SearchForm";

const meta = {
  title: "widgets/header/SearchForm",
  component: SearchForm,
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFindClick: fn(),
    onReplaceClick: fn(),
    onFormChange: fn(),
  },
};

export const Replace: Story = {
  args: {
    onFindClick: fn(),
    onReplaceClick: fn(),
    onFormChange: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByTestId("SearchForm.ReplaceCheckbox");
    await userEvent.click(checkbox);
  },
};
