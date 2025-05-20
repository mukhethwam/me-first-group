import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add history fallback to support SPA routing
    historyApiFallback: true,
  },
  plugins: [
    react({
      // Handle JSX more efficiently
      jsxImportSource: "react",
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] // Ensure all extensions are properly resolved
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        format: 'es', // Ensure ES module format
        inlineDynamicImports: false
      },
      // Ensure all dependencies are properly bundled
      external: [],
    },
    sourcemap: true,
    target: 'es2015',
    // Ensure correct script type output
    polyfillModulePreload: true,
    // Improve CSS handling
    cssCodeSplit: true,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      strictRequires: true,
    },
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: mode === 'production',
      },
    },
  },
  // Use relative base path for easier deployments on any domain
  base: './',
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'es2020',
      // Ensure proper JSX transformation
      jsx: 'automatic',
    },
  },
  // Avoid inconsistent chunk loading
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
}));
