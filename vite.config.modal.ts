import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vite config for modal standalone build
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist-modal',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        modal: path.resolve(__dirname, 'src/modal-standalone.tsx')
      },
      output: {
        entryFileNames: 'assets/modal-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
});
