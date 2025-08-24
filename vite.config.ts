import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { ViteSitemap } from "vite-plugin-sitemap";

export default defineConfig({
  base: "/", // ✅ required for GitHub Pages / general deployment
  plugins: [
    react(),
    ViteSitemap({
      hostname: 'https://zenyukti.in', // your main domain
      // optional: if you have specific routes, uncomment below
      // routes: ['/', '/about', '/contact']
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});