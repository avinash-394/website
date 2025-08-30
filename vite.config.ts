import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import VitePluginSitemap from "vite-plugin-pages-sitemap";
import { format } from "prettier"; // optional, for XML formatting

export default defineConfig({
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: "https://zenyukti.in",
      routes: [
        { path: "/", changefreq: "daily", priority: 1.0 },
        { path: "/about", changefreq: "monthly", priority: 0.8 },
        { path: "/community", changefreq: "weekly", priority: 0.7 },
        { path: "/contact", changefreq: "monthly", priority: 0.6 },
        { path: "/join-us", changefreq: "weekly", priority: 0.7 },
        { path: "/team", changefreq: "monthly", priority: 0.8 },
      ],
      // pretty format XML
      xmlFormatter: (xml: string) => format(xml, { parser: "html" }),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
