import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import ViteSitemap from "vite-plugin-sitemap"; // ✅ default import

export default defineConfig({
  base: "/", // ✅ required for GitHub Pages / general deployment
  plugins: [
    react(),
    ViteSitemap({
      hostname: 'https://zenyukti.in', // main domain
      // optional: specify routes if needed
      // routes: ['/', '/about', '/contact']
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
