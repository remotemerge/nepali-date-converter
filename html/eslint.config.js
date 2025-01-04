import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import stylisticPlugin from '@stylistic/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['dist/**', 'node_modules/**', 'public/**'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.json', '.ts'],
        },
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.es2024,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylisticPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      // Best Practices
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-var': 'error',
      eqeqeq: 'error',
      'no-implicit-coercion': 'error',

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',

      // Stylistic
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/no-multiple-empty-lines': [
        'error',
        { max: 1, maxBOF: 0, maxEOF: 1 },
      ],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/indent': [
        'error',
        2,
        { SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] },
      ],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],

      // Prettier
      'prettier/prettier': 'error',

      // Imports
      'import/no-unresolved': 'error',
      'import/order': ['error', { 'newlines-between': 'always' }],
    },
  },
];
