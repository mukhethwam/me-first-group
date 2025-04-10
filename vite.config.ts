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
        entryFileNames: 'assets/app.[hash].js',
        chunkFileNames: 'assets/chunk.[hash].js',
        assetFileNames: ({ name }) => {
          if (name && /\.css$/.test(name)) {
            return 'assets/style.css';
          }
          return 'assets/[name].[hash].[ext]';
        },
        format: 'es',
        generatedCode: {
          preset: 'es2015'
        }
      }
    },
    sourcemap: false,
    minify: true,
    target: 'es2015'
  },
  base: './'
}));
