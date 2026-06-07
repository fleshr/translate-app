import { useTranslationProcessStore } from "@/features/translation-process";
import { getTranslationProcessStoreStateMock } from "@/features/translation-process/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScriptButton } from "./ScriptButton";

const meta = {
  title: "widgets/header/ScriptButton",
  component: ScriptButton,
} satisfies Meta<typeof ScriptButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTranslating: Story = {
  decorators: [
    withStoreState(
      useTranslationProcessStore,
      getTranslationProcessStoreStateMock({ status: "translating" }),
    ),
  ],
};

export const ModalOpened: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByTestId("ScriptButton");
    await userEvent.click(button);
  },
};
