import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),

    // Generate robots.txt automatically during production build
    {
      name: "generate-robots-txt",
      generateBundle() {
        const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: https://utkalproperty.com/sitemap.xml\n`;
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: robotsTxt,
        });
      },
    },
  ],

  build: {
    target: "esnext",
    minify: "esbuild",
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: false,
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Group primary vendor code together to reduce chained roundtrips
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router") ||
              id.includes("react-icons")
            ) {
              return "vendor";
            }
            // Separate secondary utilities
            if (id.includes("axios")) {
              return "network";
            }
          }
        },
      },
    },
  },

  server: {
    host: "localhost",
  },

  preview: {
    host: "localhost",
  },
});