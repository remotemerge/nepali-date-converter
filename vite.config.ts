import { defineConfig } from 'vite';

// overwrite configs
export default defineConfig({
  build: {
    lib: {
      entry: './src/Converter.ts',
      name: 'DateConverter',
      formats: ['es', 'umd'],
      fileName: (format) => {
        return `ndc-${format}.js`;
      },
    },
  },
});
