import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { Mode, plugin as markdown } from "vite-plugin-markdown";

// https://vite.dev/config/
export default defineConfig(() => ({
  base: process.env.VITE_BASE_URL || "/",
  plugins: [react(), tailwindcss(), markdown({ mode: [Mode.MARKDOWN] })],
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  // build: {
  //   rollupOptions: { external: ["/pagefind/pagefind.js"] },
  // },
}));
