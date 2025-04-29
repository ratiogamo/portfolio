import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    // Removed Replit-specific plugins
  ],
  // Removed resolve.alias and root for simpler path resolution
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    cssCodeSplit: false, // Generate a single CSS file
    assetsDir: 'assets', // Explicitly set assets directory
    rollupOptions: {
      input: { // Explicitly define input entry points
        main: 'client/src/main.tsx',
        style: 'client/src/index.css', // Add CSS file as an entry point
      },
      output: {
        assetFileNames: (assetInfo) => {
          console.log('Processing asset:', assetInfo.name); // Log asset name
          if (assetInfo.name === 'style.css') { // Target the main CSS output
            return 'assets/style.css'; // Output as assets/style.css
          }
          // Ensure assetInfo.name is a string before splitting
          const name = String(assetInfo.name);
          let extType = name.split('.').at(1) || '';
          // Ensure extType is a string before testing with regex
          if (typeof extType === 'string' && /png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (typeof extType === 'string' && /woff|woff2|ttf|eot/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },
});
