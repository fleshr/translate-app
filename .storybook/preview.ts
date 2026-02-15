import "@/app/styles/styles";

import { withProviders } from "@/shared/lib/storybook";
import type { Preview } from "@storybook/react-vite";
import { Locales } from "intlayer";

const preview: Preview = {
  globalTypes: {
    locale: {
      description: "Locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: Locales.ENGLISH, title: "English" },
          { value: Locales.RUSSIAN, title: "Русский" },
        ],
      },
    },
    theme: {
      description: "Theme",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  initialGlobals: {
    locale: Locales.ENGLISH,
    theme: "light",
  },
  decorators: [withProviders],
};

export default preview;
