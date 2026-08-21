const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const tseslint = require('typescript-eslint');

module.exports = [
  {
    ignores: ['node_modules/', '_site/', '*.min.js', '.ralph/'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        caches: 'readonly',
        URL: 'readonly',
        es2022: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ['eleventy.config.ts', '**/*.ts'],
  })),
  {
    files: ['eleventy.config.ts', '**/*.ts'],
    plugins: {
      prettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-undef': 'off',
      'prettier/prettier': 'error',
    },
  },
];
