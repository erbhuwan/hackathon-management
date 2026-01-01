import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 3.5 * 1024 * 1024,
      },
      registerType: "autoUpdate",
      minify: true,
      devOptions: {
        enabled: true,
        /* other options */
      },
    }),
  ],
  build: {
    outDir: "build",
    minify: "terser",
    sourcemap: mode === "development",
    cssMinify: mode === "development" ? false : "lightningcss",
    chunkSizeWarningLimit: 1024 * 1024,
    rollupOptions: {
      treeshake: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
}));
