import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Plugin to ensure correct sitemap is copied to dist
// CRITICAL: Force our merged sitemap, overriding any Lovable auto-generated sitemap
const copySitemapPlugin = () => ({
  name: 'copy-sitemap',
  enforce: 'post' as const, // Run after all other plugins
  writeBundle() {
    // Force copy immediately after bundle write
    const publicDir = path.resolve(__dirname, 'public');
    const distDir = path.resolve(__dirname, 'dist');

    const src = path.join(publicDir, 'sitemap.xml');
    const dest = path.join(distDir, 'sitemap.xml');

    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      const urlCount = (fs.readFileSync(dest, 'utf8').match(/<url>/g) || []).length;
      console.log(`✓ Forced copy of sitemap.xml to dist/ - ${urlCount} URLs verified`);
    }
  },
  closeBundle() {
    // FINAL enforcement - run as LAST operation before build completion
    const publicDir = path.resolve(__dirname, 'public');
    const distDir = path.resolve(__dirname, 'dist');

    const src = path.join(publicDir, 'sitemap.xml');
    const dest = path.join(distDir, 'sitemap.xml');

    if (fs.existsSync(src)) {
      // Ensure dist directory exists
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
      const urlCount = (fs.readFileSync(dest, 'utf8').match(/<url>/g) || []).length;
      console.log(`✓ FINAL sitemap enforcement - ${urlCount} URLs (overriding Lovable auto-generated sitemap)`);
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    copySitemapPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
