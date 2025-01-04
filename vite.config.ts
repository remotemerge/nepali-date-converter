import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ include: 'src/*.ts' })], // Generate TypeScript declaration files
  build: {
    minify: true,
    lib: {
      entry: './src/index.ts',
      name: 'DateConverter',
      formats: ['es', 'iife', 'cjs'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'ndc.js'; // ES Module format
          case 'iife':
            return 'ndc-browser.js'; // IIFE format (for browsers)
          case 'cjs':
            return 'ndc-node.js'; // CommonJS format (for Node.js)
          default:
            return `ndc-${format}.js`; // Fallback for other formats
        }
      },
    },
    sourcemap: true, // Generate source maps for debugging
  },
});
