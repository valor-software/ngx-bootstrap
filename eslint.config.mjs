import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  {
    rules: {}
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*']
            }
          ]
        }
      ]
    },
    ignores: ['**/*.spec.ts']
  },
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/angular'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      semi: 'off',
      'no-extra-semi': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      // Newly enabled by the @angular-eslint v22 recommended set. ngx-bootstrap
      // intentionally uses ChangeDetectionStrategy.Eager to preserve the pre-v22
      // default behavior for consumers, so opting out of OnPush is by design.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      // Newly enabled by the typescript-eslint v8 recommended set.
      'no-constant-binary-expression': 'off'
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.*?.json'
      }
    }
  },
  {
    files: ['**/*.html'],
    rules: {
      // Newly enabled by the @angular-eslint v22 template recommended/accessibility
      // presets. Pre-existing templates were not authored against these a11y rules.
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/alt-text': 'off',
      '@angular-eslint/template/role-has-required-aria': 'off'
    }
  },
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'no-extra-semi': 'off'
    }
  }
];
