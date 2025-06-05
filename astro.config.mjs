import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://stylish-portfolio.pages.dev",
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
