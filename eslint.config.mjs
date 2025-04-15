import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindcss from 'eslint-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: ['**/dist/', 'components/ui/'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
  ),
  {
    plugins: {
      tailwindcss,
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': typescriptEslintEslintPlugin,
      react,
      prettier: eslintPluginPrettier,
    },

    settings: {
      tailwindcss: {
        callees: ['cn'],
        config: 'tailwind.config.js',
      },

      next: {
        rootDir: ['./'],
      },
    },

    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@next/next/no-html-link-for-pages': 'off',
      'react/jsx-key': 'off',
      'tailwindcss/no-custom-classname': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json', // Ensure this points to your tsconfig.json
      },
    },
  },
];

export default config;
