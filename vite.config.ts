
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/app.[hash]',
        chunkFileNames: 'assets/chunk.[hash]',
        assetFileNames: ({ name }) => {
          // Don't hash CSS files to simplify loading
          if (name && /\.css$/.test(name)) {
            return 'assets/style.[ext]';
          }
          // Remove extensions for JSON files
          if (name && /\.json$/.test(name)) {
            return 'assets/[name].[hash]';
          }
          return 'assets/[name].[hash].[ext]';
        },
        format: 'es',
        generatedCode: {
          preset: 'es2015'
        }
      }
    },
    // Enable for development only
    sourcemap: false,
    // Minify code for production
    minify: true,
    // Ensure code works in older browsers
    target: 'es2015'
  },
  base: './', // Use relative paths with explicit dot
}));
