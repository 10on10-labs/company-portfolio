import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsEslint from 'typescript-eslint';

//Ref#1:  will have to find compatible plugin with tailwind css v4
//@TODO Ref#1
// import tailwindcss from 'eslint-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: ['**/dist/', 'components/ui/', 'sanity.types.ts'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    //@TODO Ref#1
    // 'plugin:tailwindcss/recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended', // Keep this last
  ),
  {
    plugins: {
      //@TODO Ref#1
      // tailwindcss,
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': tsEslint.plugin,
      react,
      eslintPluginPrettier,
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
      'no-unused-vars': 'error',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
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
      parser: tsEslint.parser,
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
