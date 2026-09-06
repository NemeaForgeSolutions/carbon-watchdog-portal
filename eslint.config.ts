import pluginJs from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import filenameRules from 'eslint-plugin-filename-rules';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jsdoc from 'eslint-plugin-jsdoc';
import jsonc from 'eslint-plugin-jsonc';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import parser from 'jsonc-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsEslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import css from '@eslint/css';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'nginx/',
      'coverage/',
      '.vite/',
      '.git/',
      '.husky/',
      '.vscode/',
      '.dockerignore',
      'Dockerfile',
      '.commitlintrc.json',
      'tsconfig.json',
      '.editorconfig',
      '.eslint*',
      '.prettier*',
      '.stylelint*',
      '.env*',
      '.gitignore',
      '.nvmrc',
      '.npmrc',
      'package-lock.json',
      '.postcssrc.json',
      'eslint.config.ts',
      '*.yml',
      '**/*.css',
      'src/components/ui/**/*',
    ],
  },
  {
    ...pluginJs.configs.recommended,
    files: ['**/*.{mjs,cjs,js}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      import: importPlugin,
      jest,
      'filename-rules': filenameRules,
      jsdoc,
      prettier,
      jsonc,
    },
    rules: {
      'import/no-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'import/no-named-as-default': 0,
      'import/no-useless-path-segments': 0,
      'import/no-named-as-default-member': 0,
      'import/no-relative-packages': 0,
      'import/no-cycle': 0,
      'import/no-self-import': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-duplicates': 0,

      'import/order': [
        'error',
        {
          groups: [
            'external',
            'builtin',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'jsdoc/require-throws': 'error',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/no-blank-blocks': 'warn',
      'jsdoc/require-asterisk-prefix': 'warn',
      'jsdoc/require-description': 'warn',
      'jsdoc/sort-tags': 'warn',
      'jsdoc/check-syntax': 'warn',

      'jsdoc/tag-lines': [
        'warn',
        'never',
        {
          startLines: 1,
        },
      ],

      'jsdoc/require-param': [
        'warn',
        {
          checkDestructuredRoots: false,
        },
      ],

      'jsdoc/require-jsdoc': [
        'warn',
        {
          publicOnly: true,

          require: {
            FunctionDeclaration: true,
            FunctionExpression: true,
            ArrowFunctionExpression: false,
            ClassDeclaration: true,
            ClassExpression: true,
            MethodDefinition: true,
          },

          contexts: [
            'FunctionDeclaration',
            'FunctionExpression',
            'ArrowFunctionExpression',
            'ClassDeclaration',
            'ClassExpression',
            'MethodDefinition',
          ],

          enableFixer: true,
        },
      ],

      'jsdoc/require-hyphen-before-param-description': 'warn',
      'jsdoc/require-returns': 'warn',
      'object-curly-newline': 'off',
      'linebreak-style': 0,
      quotes: 'off',
      'no-alert': 'off',
      'no-array-constructor': 'off',
      'no-bitwise': 'off',
      'no-caller': 'off',
      'no-case-declarations': 'error',
      'no-catch-shadow': 'off',
      'no-class-assign': 'error',
      'no-cond-assign': 'error',
      'no-confusing-arrow': 'off',
      'no-console': 'warn',
      'no-control-regex': 0,
      'no-use-before-define': 'off',
      'no-duplicate-imports': 'error',
      'no-param-reassign': 'off',
      'object-shorthand': ['error', 'always'],

      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],

      'no-unused-vars': 'error',

      // 'prettier/prettier': ['warn'],
    },
  },

  {
    files: ['{src,test}/**/*.{ts}'],
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      jest,
      'filename-rules': filenameRules,
      jsdoc,
      jsonc,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/no-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'import/no-named-as-default': 0,
      'import/no-useless-path-segments': 0,
      'import/no-named-as-default-member': 0,
      'import/no-relative-packages': 0,
      'import/no-cycle': 0,
      'import/no-self-import': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-duplicates': 0,

      'import/order': [
        'error',
        {
          groups: [
            'external',
            'builtin',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'jsdoc/require-throws': 'error',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/no-blank-blocks': 'warn',
      'jsdoc/require-asterisk-prefix': 'warn',
      'jsdoc/require-description': 'warn',
      'jsdoc/sort-tags': 'warn',
      'jsdoc/check-syntax': 'warn',

      'jsdoc/tag-lines': [
        'warn',
        'never',
        {
          startLines: 1,
        },
      ],

      'jsdoc/require-param': [
        'warn',
        {
          checkDestructuredRoots: false,
        },
      ],

      'jsdoc/require-jsdoc': [
        'warn',
        {
          publicOnly: true,

          require: {
            FunctionDeclaration: true,
            FunctionExpression: true,
            ArrowFunctionExpression: false,
            ClassDeclaration: true,
            ClassExpression: true,
            MethodDefinition: true,
          },

          contexts: [
            'FunctionDeclaration',
            'FunctionExpression',
            'ArrowFunctionExpression',
            'ClassDeclaration',
            'ClassExpression',
            'MethodDefinition',
          ],

          enableFixer: true,
        },
      ],

      'jsdoc/require-hyphen-before-param-description': 'off',
      'jsdoc/require-returns': 'off',
      'object-curly-newline': 'off',
      'linebreak-style': 0,
      quotes: 'off',
      'no-alert': 'off',
      'no-array-constructor': 'off',
      'no-bitwise': 'off',
      'no-caller': 'off',
      'no-case-declarations': 'error',
      'no-catch-shadow': 'off',
      'no-class-assign': 'error',
      'no-cond-assign': 'error',
      'no-confusing-arrow': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-control-regex': 0,
      'no-use-before-define': 'off',
      'no-duplicate-imports': 'error',
      'no-param-reassign': 'off',
      'object-shorthand': ['error', 'always'],

      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],

      'no-unused-vars': 'error',
    },
  },

  ...vue.configs['flat/recommended'].map((config) => ({
    ...config,
    files: config.files ?? ['**/*.vue'],
  })),
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      vue,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      /* Vue specific customizations */
      'vue/multi-word-component-names': 'off',
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false },
      ],
      'vue/no-unused-components': 'warn',
      'vue/no-v-html': 'off',

      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['src/**/*.json'],
    language: 'json/json',
    languageOptions: {
      parser,
    },
    ...json.configs.recommended,
    rules: {
      'json/no-duplicate-keys': 'error',
    },
  },

  {
    files: ['**/*.css'],
    language: 'css/css',
    ...css.configs.recommended,
  },

  ...markdown.configs.recommended,
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    language: 'markdown/commonmark',
    rules: {
      'markdown/no-html': 'error',
      'no-irregular-whitespace': 0,
      'markdown/no-missing-label-refs': 0,
    },
  },
];
