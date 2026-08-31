import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),

    // Generate robots.txt automatically during production build
    {
      name: "generate-robots-txt",

      generateBundle() {
        const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://utkalproperty.com/sitemap.xml
`;

        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: robotsTxt,
        });
      },
    },
  ],

  build: {
    // Generate source maps for production debugging
    sourcemap: true,

    // Vite 8 uses Oxc by default.
    // Do NOT set minify: "esbuild"

    target: "es2020",

    cssCodeSplit: true,

    chunkSizeWarningLimit: 1000,
  },

  server: {
    host: true,
  },

  preview: {
    host: true,
  },
});