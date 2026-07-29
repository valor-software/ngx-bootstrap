import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {},
    languageOptions: {
      parserOptions: {
        // tsconfigs live one level up, alongside the schematics package root.
        project: ['src/schematics/tsconfig.*?.json']
      }
    }
  }
  // No Angular template config here: this is the ng-add schematics library,
  // it has no components or HTML templates.
];
