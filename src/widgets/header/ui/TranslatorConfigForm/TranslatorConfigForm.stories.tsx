import { useTranslatorStore } from "@/entities/translator";
import { getTranslatorStoreStateMock } from "@/entities/translator/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslatorConfigForm } from "./TranslatorConfigForm";

const meta = {
  title: "widgets/header/TranslatorConfigForm",
  component: TranslatorConfigForm,
  decorators: [
    withStoreState(useTranslatorStore, getTranslatorStoreStateMock()),
  ],
} satisfies Meta<typeof TranslatorConfigForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    translator: "openai",
    configForm: {
      default: { model: "test" },
      fields: [{ key: "model", label: "Model", type: "text" }],
    },
  },
};
