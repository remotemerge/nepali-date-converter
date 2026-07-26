import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  printWidth: 80,
  ignorePatterns: ['dist/**', 'output/**', 'public/**', 'src/*.js'],
  overrides: [
    {
      files: ['**/*.scss', '**/*.css', '**/*.html', '**/*.yml'],
      options: {
        singleQuote: false,
      },
    },
  ],
});
