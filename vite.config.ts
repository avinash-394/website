import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { ViteSitemap } from "vite-plugin-sitemap";

export default defineConfig({
  base: "/", // required for general deployment / GitHub Pages
  plugins: [
    react(),
    ViteSitemap({
      hostname: 'https://zenyukti.in', // main domain
      routes: [
        { path: '/', changefreq: 'daily', priority: 1.0 },
        { path: '/about', changefreq: 'monthly', priority: 0.8 },
        { path: '/code-of-conduct', changefreq: 'yearly', priority: 0.5 },
        { path: '/community', changefreq: 'weekly', priority: 0.7 },
        { path: '/contact', changefreq: 'monthly', priority: 0.6 },
        { path: '/join-us', changefreq: 'weekly', priority: 0.7 },
        { path: '/privacy', changefreq: 'yearly', priority: 0.4 },
        { path: '/projects', changefreq: 'weekly', priority: 0.8 },
        { path: '/team', changefreq: 'monthly', priority: 0.7 },
        { path: '/terms-of-service', changefreq: 'yearly', priority: 0.4 },
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
