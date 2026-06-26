import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { getSearchStoreStateMock } from "../../mocks";
import { useSearchStore } from "../../model/searchStore/store";
import { SearchForm } from "./SearchForm";

const meta = {
  title: "features/search/SearchForm",
  component: SearchForm,
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  decorators: [withStoreState(useSearchStore, getSearchStoreStateMock())],
};
