import type { Decorator } from "@storybook/react-vite";

export const withHeight = (height = 200): Decorator => {
  return (Story) => {
    return (
      <div style={{ height: `${height}px` }}>
        <Story />
      </div>
    );
  };
};
