import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  printWidth: 80,
  ignorePatterns: ['.github/**', 'dist/**', 'output/**', 'public/**'],
  overrides: [
    {
      files: ['**/*.scss', '**/*.css', '**/*.html', '**/*.yml'],
      options: {
        singleQuote: false,
      },
    },
  ],
});
