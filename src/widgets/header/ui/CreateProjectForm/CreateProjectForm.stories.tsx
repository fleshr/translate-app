import { useParserStore } from "@/entities/parser";
import { getParserStoreStateMock } from "@/entities/parser/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CreateProjectForm } from "./CreateProjectForm";

const meta = {
  title: "widgets/header/CreateProjectForm",
  component: CreateProjectForm,
  args: { onCancel: fn(), onSubmit: fn() },
  decorators: [withStoreState(useParserStore, getParserStoreStateMock())],
} satisfies Meta<typeof CreateProjectForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExternalParser: Story = {
  play: async ({ canvas, userEvent }) => {
    const select = canvas.getByTestId("CreateProjectForm.ParserSelect");
    await userEvent.click(select);

    const option = canvas.getByRole("option", {
      name: "Test Module 1 (1.0.0)",
    });
    await userEvent.click(option);
  },
};
