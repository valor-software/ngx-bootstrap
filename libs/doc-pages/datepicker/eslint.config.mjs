import baseConfig from '../../../eslint.config.mjs';
import angular from 'angular-eslint';
import nx from '@nx/eslint-plugin';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ngx-bootstrap-base',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ngx-bootstrap-base',
          style: 'kebab-case'
        }
      ]
    },
    languageOptions: {
      parserOptions: {
        project: ['libs/doc-pages/datepicker/tsconfig.*?.json']
      }
    }
  },
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.html'],
    rules: {
      // Newly enabled by the @angular-eslint v22 template accessibility preset
      // (nx flat/angular-template). Pre-existing templates predate these a11y rules.
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/alt-text': 'off',
      '@angular-eslint/template/role-has-required-aria': 'off'
    }
  }
];
