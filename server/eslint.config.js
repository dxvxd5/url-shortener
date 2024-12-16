import js from '@eslint/js';
import globals from 'globals';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbTypeScript from 'eslint-config-airbnb-typescript';
import importPlugin from 'eslint-plugin-import';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: [
      'node_modules/**',
      'dist/**',
      'eslint.config.js',
      'vitest.config.ts',
    ], // Ignore common folders
    languageOptions: {
      ecmaVersion: 'latest', // Enable modern ECMAScript features
      sourceType: 'module', // Use ES modules
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: typescriptParser, // Use TypeScript parser
      parserOptions: {
        project: './tsconfig.json', // Link to TypeScript configuration
      },
    },
    plugins: {
      import: importPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs['recommended-type-checked'].rules,
      ...js.configs.recommended.rules, // JavaScript recommended rules
      ...airbnbBase.rules, // Airbnb Base rules
      ...airbnbTypeScript.rules, // Airbnb TypeScript rules

      // Custom rule overrides
      'no-console': 'error',
      'no-underscore-dangle': 'off', // Allow `_id` and similar naming patterns
      'class-methods-use-this': 'off', // Relax rule for methods in classes
      eqeqeq: 'error', // Enforces strict equality

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': ['warn'],
      '@typescript-eslint/no-unsafe-return': 'error',

      // Import rules
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          ts: 'always',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.test.ts', '**/*.config.ts'] },
      ],

      // Disable React-specific rules from Airbnb configuration
      'react/jsx-filename-extension': 'off', // Allow JSX in .js and .ts files
      'react/react-in-jsx-scope': 'off', // React 17 JSX transform does not need React in scope
      'react/jsx-no-bind': 'off', // Disable rule preventing inline functions in JSX
      'react/prop-types': 'off', // Disable PropTypes checking (use TypeScript instead)
      'react/no-unescaped-entities': 'off', // Allow unescaped entities in JSX
      'react/jsx-curly-brace-presence': 'off', // Disable checking for curly braces in JSX expressions
    },
  },
];
