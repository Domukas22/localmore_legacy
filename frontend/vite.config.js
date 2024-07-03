import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";
import path from "path"; // Import path module from Node.js

// Use Node's process.env to check if in production
// this occurs when you run the "npm run build" command
const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
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
  server: {
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
});
