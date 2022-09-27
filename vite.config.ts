import { defineConfig } from 'vite';

// overwrite configs
export default defineConfig({
  build: {
    lib: {
      entry: './src/Converter.ts',
      name: 'DateConverter',
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => {
        return `ndc-${format}.js`;
      },
    },
  },
});
