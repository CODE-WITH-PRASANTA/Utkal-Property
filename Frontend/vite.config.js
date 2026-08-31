import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),

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
    sourcemap: true,
    target: "es2020",
    chunkSizeWarningLimit: 1000,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-icons")) {
              return "icons";
            }
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor";
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