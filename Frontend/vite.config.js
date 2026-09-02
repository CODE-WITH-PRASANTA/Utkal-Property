import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    // Generates .gz compressed assets
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
    }),
    // Generates .br (Brotli) compressed assets
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
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
    cssCodeSplit: false,
    sourcemap: false,
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Keep framework core separate
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "framework";
            }
            // Separate utilities
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