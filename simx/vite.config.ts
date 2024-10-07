import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Set base for GH Pages
  base: process.env.GITHUB_ACTIONS
    ? "/makecode-microbit-ml-simulator/"
    : undefined,
  build: {
    outDir: "build",
    sourcemap: true,
  },
  plugins: [react()],
});
