import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

// Use Node's process.env to check if in production
const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/localmore/",
  base: isProduction ? "/localmore/" : "/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./testSetup.js",
  },
  resolve: {
    alias: {
      "@styles": new URL("src/styles", import.meta.url).pathname,
    },
  },
  // server: {
  //   host: "0.0.0.0",
  // },
});
