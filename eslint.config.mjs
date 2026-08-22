import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierConfig from 'eslint-config-prettier';

/** Для запрета приватных путей */
const PROHIBITED_PATH_GROUPS = [
  // Запрет импорта глубоких приватных файлов папок доменов снаружи
  './domains/*/*/**',
  // Предпочтение абсолютных путей (@/) вместо относительных для корневых слоев
  '../**/domains',
  '../**/components',
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import-plugin': importPlugin,
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
        alias: {
          map: [
            ['@', './src'],
            ['@ui', './src/components/ui'],
            ['@shared', './src/components/shared'],
            ['@lib', './src/lib'],
            ['@domains/auth', './src/domains/auth'],
            ['@domains/profile', './src/domains/profile'],
            ['@domains/transfer', './src/domains/transfer'],
            ['@domains/marketing', './src/domains/marketing'],
          ],
          extensions: ['.ts', '.js', '.tsx', '.json'],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'import-plugin/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: ['./src/components/ui'],
              from: ['./src/domains/**'],
              message:
                'Компоненты shadcn/ui (@ui) должны быть чистыми и независимыми от бизнес-доменов.',
            },
            {
              target: ['./src/components/shared', './src/lib/**'],
              from: ['./src/app/**', './src/domains/**'],
              message:
                'Импорт из страниц (app) и бизнес-модулей (domains) в shared/lib слои запрещен.',
            },
            {
              target: ['./src/domains/auth'],
              from: [
                './src/domains/transfer',
                './src/domains/profile',
                './src/domains/marketing',
              ],
              message:
                'Домен Auth изолирован. Импорты из transfer, profile или marketing запрещены.',
            },
            {
              target: ['./src/domains/transfer'],
              from: ['./src/domains/auth', './src/domains/marketing'],
              message:
                'Домен Transfer не может напрямую импортировать внутренности Auth или Marketing. Используйте @shared или @lib.',
            },
            {
              target: ['./src/domains/profile'],
              from: ['./src/domains/transfer', './src/domains/marketing'],
              message:
                'Домен Profile не должен импортировать логику переводов (transfer) или лендинга.',
            },
          ],
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: PROHIBITED_PATH_GROUPS,
              message:
                'Запрещено использовать глубокие приватные пути. Используйте публичные абсолютные алиасы доменов (например, @domains/auth).',
            },
          ],
        },
      ],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // external libs
            ['^react', '^next', '^@tanstack', '^[a-z]'],
            // aliases
            ['^@'],
            // relative imports
            ['^\\.\\.(?!/?$)', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // css
            ['^.*\\.css$'],
            // types
            ['.*\\u0000$'],
          ],
        },
      ],

      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['const', 'let'], next: 'expression' },
        { blankLine: 'always', prev: 'expression', next: ['const', 'let'] },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },
  prettierConfig,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
]);

export default eslintConfig;
