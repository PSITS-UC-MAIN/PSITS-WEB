import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import pluginReweiteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginReweiteAll()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/v2": {
        target: "http:localhost:3000/api/v2",
        changeOrigin: true,
      },
    },
  },
});
