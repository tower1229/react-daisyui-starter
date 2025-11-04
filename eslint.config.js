import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Disable base rules that are covered by unused-imports
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',

      // Enable unused-imports rules
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Enable simple-import-sort rules
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports
            ['^\\u0000'],
            // Node.js built-in modules
            ['^node:'],
            // React and related packages
            ['^react', '^@?\\w'],
            // Internal packages (adjust @ to match your alias if needed)
            ['^(@|src)(/.*|$)'],
            // Parent imports (put `..` last)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports (put same-folder imports and `.` last)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports
            ['^.+\\.?(css|scss|sass|less)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]);
