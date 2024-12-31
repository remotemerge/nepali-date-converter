import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// overwrite configs
export default defineConfig({
  plugins: [dts({ include: 'src/*.ts' })],
  build: {
    minify: false,
    lib: {
      entry: './src/index.ts',
      name: 'DateConverter',
      formats: ['es', 'iife', 'cjs'],
      fileName: (format) => {
        return `ndc-${format}.js`;
      },
    },
    sourcemap: true,
  },
});
