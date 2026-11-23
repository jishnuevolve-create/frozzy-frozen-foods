import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps every asset path relative, so the build works in
// Hostinger's public_html root or in any sub-folder.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    assetsInlineLimit: 2048,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: { vendor: ["react", "react-dom"], motion: ["framer-motion"] },
      },
    },
  },
});
