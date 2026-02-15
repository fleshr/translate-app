import { getTranslationBaseSegmentMock } from "@/shared/mocks/translation";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SegmentEditForm } from "./SegmentEditForm";

const meta = {
  title: "widgets/bottom-panel/SegmentEditForm",
  component: SegmentEditForm,
  args: {
    segment: getTranslationBaseSegmentMock(),
    onChange: fn(),
  },
} satisfies Meta<typeof SegmentEditForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
