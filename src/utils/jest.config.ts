/* eslint-disable */
export default {
  displayName: 'utils',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/testing/test-setup.ts'],
  globals: {},
  coverageDirectory: '../../coverage/src/utils',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ],
  transform: {
    '^.+.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  moduleFileExtensions: ['mjs', 'ts', 'js', 'html']
};
