import { getTranslationBaseResourceMock } from "@/entities/translation/mocks";
import { withWidth } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationResourceButton } from "./TranslationResourceButton";

const meta = {
  title: "widgets/translation-resources/TranslationResourceButton",
  component: TranslationResourceButton,
  args: { resource: getTranslationBaseResourceMock() },
  decorators: [withWidth()],
} satisfies Meta<typeof TranslationResourceButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { isSelected: true },
};

export const Processing: Story = {
  args: { isProcessing: true },
};

export const WithProgress: Story = {
  args: {
    progress: {
      done: 50,
      total: 100,
    },
  },
};

export const SelectedWithProgress: Story = {
  args: {
    progress: {
      done: 50,
      total: 100,
    },
    isSelected: true,
  },
};

export const ProcessingWithProgress: Story = {
  args: {
    progress: {
      done: 50,
      total: 100,
    },
    isProcessing: true,
  },
};

export const ProcessingSelectedWithProgress: Story = {
  args: {
    progress: {
      done: 50,
      total: 100,
    },
    isProcessing: true,
    isSelected: true,
  },
};
