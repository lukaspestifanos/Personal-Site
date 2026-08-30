import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2022",
    assetsInlineLimit: 4096,
    cssCodeSplit: false,
  },
  server: {
    port: 5173,
  },
});
