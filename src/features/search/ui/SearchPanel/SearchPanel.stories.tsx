import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { getSearchStoreStateMock } from "../../mocks";
import { useSearchStore } from "../../model/searchStore/store";
import { SearchPanel } from "./SearchPanel";

const meta = {
  title: "features/search/SearchPanel",
  component: SearchPanel,
  decorators: [
    withStoreState(useTranslationStore, getTranslationStoreStateMock()),
  ],
} satisfies Meta<typeof SearchPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  decorators: [withStoreState(useSearchStore, getSearchStoreStateMock())],
};
