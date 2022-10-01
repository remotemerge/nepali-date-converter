import { defineConfig } from 'vite';

// overwrite configs
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'DateConverter',
      formats: ['es', 'iife', 'cjs'],
      fileName: (format) => {
        return `ndc-${format}.js`;
      },
    },
  },
});
