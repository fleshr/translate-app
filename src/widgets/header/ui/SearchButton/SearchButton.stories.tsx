import { withStoreState } from "@/shared/lib/storybook";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchButton } from "./SearchButton";

const meta = {
  title: "widgets/header/SearchButton",
  component: SearchButton,
} satisfies Meta<typeof SearchButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTranslating: Story = {
  decorators: [
    withStoreState(
      useSessionStore,
      getSessionStoreStateMock({ status: "translating" }),
    ),
  ],
};

export const ModalOpened: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByTestId("SearchButton");
    await userEvent.click(button);
  },
};
