import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
  },
  rules: {
    // Best Practices
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

    // Disable rules
    'prefer-destructuring': 'off',
    'sort-keys': 'off',
    'switch-case-braces': 'off',
  },
  ignorePatterns: ['dist/**', 'node_modules/**', 'output/**', 'public/**'],
});
