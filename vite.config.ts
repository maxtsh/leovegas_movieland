import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "LV",
  build: {
    minify: "esbuild",
    cssMinify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        compact: true,
        minifyInternalExports: true,
        manualChunks: {
          react: ["react", "react-router-dom", "react-dom"],
          redux: ["react-redux", "@reduxjs/toolkit"],
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: new URL("./src/", import.meta.url).pathname },
    ],
  },
  server: {
    open: true,
    port: 3000,
    host: "localhost",
  },
});
