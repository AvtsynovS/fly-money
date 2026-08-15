import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/** Запрет глубоких приватных путей импорта в нашей DDD структуре */
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
            ['@domains/user', './src/domains/user'],
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

      // 1. ПРАВИЛО ГРАНИЦ ДОМЕНОВ И СЛОЕВ (DDD Boundaries)
      'import-plugin/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              // Атомарный UI-Kit (shadcn) не должен знать о бизнес-логике
              target: ['./src/components/ui'],
              from: ['./src/domains/**'],
              message:
                'Компоненты shadcn/ui (@ui) должны быть чистыми и независимыми от бизнес-доменов.',
            },
            {
              // Защита общих компонентов от импорта страниц или доменов
              target: ['./src/components/shared', './src/lib/**'],
              from: ['./src/app/**', './src/domains/**'],
              message:
                'Импорт из страниц (app) и бизнес-модулей (domains) в shared/lib слои запрещен.',
            },
            {
              // Изоляция домена AUTH
              target: ['./src/domains/auth'],
              from: [
                './src/domains/transfer',
                './src/domains/user',
                './src/domains/marketing',
              ],
              message:
                'Домен Auth изолирован. Импорты из transfer, user или marketing запрещены.',
            },
            {
              // Изоляция домена TRANSFER (Переводы денег)
              target: ['./src/domains/transfer'],
              from: ['./src/domains/auth', './src/domains/marketing'],
              message:
                'Домен Transfer не может напрямую импортировать внутренности Auth или Marketing. Используйте @shared или @lib.',
            },
            {
              // Изоляция домена USER (Профиль)
              target: ['./src/domains/user'],
              from: ['./src/domains/transfer', './src/domains/marketing'],
              message:
                'Домен User не должен импортировать логику переводов (transfer) или лендинга.',
            },
          ],
        },
      ],

      // 2. ЗАПРЕТ ПРИВАТНЫХ ПУТЕЙ (перенесено из старого проекта)
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

      // 3. АВТО-СОРТИРОВКА ИМПОРТОВ (перенесено из старого проекта и адаптировано под Next.js 16)
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Пакеты: react, next, внешние библиотеки
            ['^react', '^next', '^@tanstack', '^[a-z]'],
            // Абсолютные алиасы проекта
            ['^@'],
            // Относительные импорты
            [
              '^\\.\\.(?!/?\()',
              '^\\./(?=.*/)(?!/?\))',
              '^\\.(?!/?\()',
              '^\\./?\)',
            ],
            // Стили
            ['^styled-components\(', '^.*\\.css\)'],
            // Логические типы
            ['.*\\u0000\$'],
          ],
        },
      ],

      // 4. СТИЛИСТИЧЕСКИЕ ОТСТУПЫ (перенесено из старого проекта)
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

  // Игнорируемые пути билда Next.js
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
]);

export default eslintConfig;
