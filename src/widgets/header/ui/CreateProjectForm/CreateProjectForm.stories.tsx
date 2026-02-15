import { withStoreState } from "@/shared/lib/storybook";
import { getModuleMock } from "@/shared/mocks/module";
import { useModuleStore } from "@/shared/model/moduleStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CreateProjectForm } from "./CreateProjectForm";

const meta = {
  title: "widgets/header/CreateProjectForm",
  component: CreateProjectForm,
  args: { onCancel: fn(), onSubmit: fn() },
  decorators: [
    withStoreState(useModuleStore, {
      parsers: { "test@1.0.0": getModuleMock() },
    }),
  ],
} satisfies Meta<typeof CreateProjectForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  play: async ({ canvas, userEvent }) => {
    const select = canvas.getByTestId("CreateProjectForm.ParserSelect");
    await userEvent.click(select);

    const option = canvas.getByRole("option", { name: "Test Module (1.0.0)" });
    await userEvent.click(option);
  },
};
