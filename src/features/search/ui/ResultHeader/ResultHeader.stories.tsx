import type { Meta, StoryObj } from "@storybook/react-vite";
import { getSearchResultHeaderMock } from "../../mocks";
import { ResultHeader } from "./ResultHeader";

const meta = {
  title: "features/search/ResultHeader",
  component: ResultHeader,
} satisfies Meta<typeof ResultHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { result: getSearchResultHeaderMock() },
};
