import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
  },
  rules: {
    // Best Practices (from ESLint config)
    'no-var': 'error',
    eqeqeq: 'error',
    'no-eval': 'error',
    'no-implicit-coercion': 'error',

    // TypeScript
    'no-unused-vars': 'error',
    'no-explicit-any': 'warn',
    'consistent-type-imports': 'error',
    'no-floating-promises': 'error',
    'await-thenable': 'error',

    // Restriction rules
    'no-console': 'warn',

    // Disable rules that don't fit this codebase
    'prefer-destructuring': 'off',
    'sort-keys': 'off',
    'switch-case-braces': 'off',
  },
  globals: {
    Bun: 'readonly',
  },
  ignorePatterns: ['dist/**', 'node_modules/**'],
});
