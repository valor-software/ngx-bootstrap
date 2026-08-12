import baseConfig from '../../eslint.config.mjs';
import angular from 'angular-eslint';
import nx from '@nx/eslint-plugin';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/no-output-on-prefix': 0
    },
    languageOptions: {
      parserOptions: {
        project: ['src/alert/tsconfig.*?.json']
      }
    }
  },
  ...nx.configs['flat/angular-template']
];
