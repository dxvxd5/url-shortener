import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import typescriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: [
      'node_modules/**',
      'dist/**',
      'vite.config.ts',
      'eslint.config.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
        project: './tsconfig.json', // Ensure type-aware linting
      },
    },
    env: {
      browser: true,
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // React-specific rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      // TypeScript-specific rules
      ...typescriptPlugin.configs['recommended-type-checked'].rules,

      // JavaScript recommended rules
      ...js.configs.recommended.rules,

      // Custom overrides
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't need React in scope
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] },
      ],
      'react/prop-types': 'off', // Using TypeScript for prop validation
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }, // Allow unused vars starting with _
      ],
      '@typescript-eslint/consistent-type-imports': ['warn'],
      '@typescript-eslint/no-explicit-any': 'warn', // Discourage use of `any`

      // Import rules
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          ts: 'always',
          jsx: 'always',
          tsx: 'always',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{js,jsx,ts,tsx}',
            '**/*.spec.{js,jsx,ts,tsx}',
            'vite.config.ts',
          ],
        },
      ],

      // General rules
      eqeqeq: 'error', // Enforce strict equality
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow warnings and errors
      'no-debugger': 'error', // Disallow debugger statements
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
];
