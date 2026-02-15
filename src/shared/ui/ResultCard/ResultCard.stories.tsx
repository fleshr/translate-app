import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ResultCard } from "./ResultCard";

const items = [
  { value: "1", label: "Aboba" },
  { value: "2", label: "Test" },
];

const meta = {
  title: "shared/ResultCard",
  component: ResultCard,
  args: {
    title: "Title",
    highlight: "Test",
    onClick: fn(),
    onSelect: fn(),
    items,
  },
} satisfies Meta<typeof ResultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selectable: Story = {
  args: { selectable: true },
};

export const FullSelected: Story = {
  args: {
    selectable: true,
    selected: ["1", "2"],
  },
};

export const PartialSelected: Story = {
  args: {
    selectable: true,
    selected: ["1"],
  },
};
