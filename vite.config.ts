import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  base: "/translate-app/",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), intlayer()],
  resolve: { tsconfigPaths: true },
  build: {
    chunkSizeWarningLimit: Infinity,
    rolldownOptions: { output: { codeSplitting: false } },
  },
});
