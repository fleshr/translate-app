import { useParserStore } from "@/entities/parser";
import { getParserStoreStateMock } from "@/entities/parser/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { getTranslationProcessStoreStateMock } from "@/features/translation-process/mocks";
import { withStoreState } from "@/shared/lib/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NewProjectButton } from "./NewProjectButton";

const meta = {
  title: "widgets/header/NewProjectButton",
  component: NewProjectButton,
  decorators: [withStoreState(useParserStore, getParserStoreStateMock())],
} satisfies Meta<typeof NewProjectButton>;

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
    const button = canvas.getByTestId("NewProjectButton");
    await userEvent.click(button);
  },
};
