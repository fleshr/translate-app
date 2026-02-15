import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

const vitestConfig = defineConfig({
  test: {
    globals: false,
    clearMocks: true,
    unstubGlobals: true,
    environment: "happy-dom",
    setupFiles: "./.vitest/setup.ts",
    reporters: ["verbose", "html"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/app/index.tsx",
        "src/shared/lib/{testing,storybook}/**/*",
        "src/**/*.{content,stories}.{ts,tsx}",
      ],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
