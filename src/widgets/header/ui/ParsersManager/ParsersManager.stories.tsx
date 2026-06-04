import { useParserStore } from "@/entities/parser";
import { getParserStoreStateMock } from "@/entities/parser/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ParsersManager } from "./ParsersManager";

const meta = {
  title: "widgets/header/ParsersManager",
  component: ParsersManager,
} satisfies Meta<typeof ParsersManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithParsers: Story = {
  decorators: [withStoreState(useParserStore, getParserStoreStateMock())],
};
