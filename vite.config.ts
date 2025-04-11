// import { defineConfig } from "vite";
import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        relativeUrls: true,
        javascriptEnabled: true,
      },
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    exclude: ["node_modules/**", "dist/**"],
  },
});
