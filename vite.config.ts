import { defineConfig } from "vite";
import { resolve } from "path";

const config = defineConfig({
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "./src") }],
  },
});

export default config;
