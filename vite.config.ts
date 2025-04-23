
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true,
    strictPort: false, // Auto find available port if 8080 is in use
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
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Add all extensions to improve module resolution
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: ({name}) => {
          // Don't hash HTML files
          if (name && /\.(html)$/.test(name)) {
            return '[name].[ext]';
          }
          return 'assets/[name].[hash].[ext]';
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendors';
          }
        }
      },
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    },
    target: ['es2015', 'chrome58', 'firefox57', 'safari11', 'edge18'],
    sourcemap: mode === 'development',
    minify: mode === 'production',
    cssCodeSplit: false,
  },
  assetsInclude: ['**/*.html', '**/*.png', '**/*.svg', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  base: './',
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
}));
