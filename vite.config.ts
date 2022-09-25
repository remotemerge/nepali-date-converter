import { defineConfig } from 'vite';

// overwrite configs
export default defineConfig({
  build: {
    lib: {
      entry: './src/converter.ts',
      name: 'DateConverter',
      fileName: 'date-converter',
      formats: ['es', 'cjs'],
    },
  },
});
