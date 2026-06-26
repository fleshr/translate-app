import type { Meta, StoryObj } from "@storybook/react-vite";
import { getSearchResultSelectMock } from "../../mocks";
import { ResultSelect } from "./ResultSelect";

const meta = {
  title: "features/search/ResultSelect",
  component: ResultSelect,
} satisfies Meta<typeof ResultSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { result: getSearchResultSelectMock() },
};
