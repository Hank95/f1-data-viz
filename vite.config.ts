import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    tailwindcss(), // Tailwind v4 Vite plugin
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    // Optimize build for production
    minify: 'esbuild',
    sourcemap: false, // Disable source maps for production
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor dependencies for better caching
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          charts: ['recharts'],
          utils: ['date-fns', 'lucide-react'],
        },
      },
    },
    // Remove console logs in production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Configure preview server
  preview: {
    port: 4173,
    host: true,
  },
});
