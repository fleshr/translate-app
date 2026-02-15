import { withStoreState } from "@/shared/lib/storybook";
import { getTranslationStoreStateMock } from "@/shared/mocks/translationStore";
import { useTranslationStore } from "@/shared/model/translationStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchPanel } from "./SearchPanel";

const meta = {
  title: "widgets/header/SearchPanel",
  component: SearchPanel,
  decorators: [
    withStoreState(useTranslationStore, getTranslationStoreStateMock()),
  ],
} satisfies Meta<typeof SearchPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithResults: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByTestId("SearchForm.SearchInput");
    const button = canvas.getByTestId("SearchForm.FindButton");
    await userEvent.type(input, "test");
    await userEvent.click(button);
  },
};

export const WithReplaceResults: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByTestId("SearchForm.SearchInput");
    const checkbox = canvas.getByTestId("SearchForm.ReplaceCheckbox");
    const button = canvas.getByTestId("SearchForm.FindButton");
    await userEvent.type(input, "test");
    await userEvent.click(checkbox);
    await userEvent.click(button);
  },
};
