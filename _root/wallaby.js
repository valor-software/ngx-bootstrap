'use strict';

const wallabyWebpack = require('wallaby-webpack');
const webpackPostprocessor = wallabyWebpack({
  entryPatterns: [
    'spec-bundle.js',
    'components/**/*spec.js'
  ],

  module: {
    loaders: [
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.html$/, loader: 'raw-loader'}
    ]
  }
});

module.exports = function conifg() {
  return {
    files: [
      {pattern: 'spec-bundle.js', load: false},
      {pattern: 'components/**/*.ts', load: false},
      {pattern: 'components/**/*.css', load: false},
      {pattern: 'components/**/*.html', load: false},
      '!components/**/*.spec.ts'
    ],

    tests: [
      {pattern: 'components/**/*.spec.ts', load: false}
    ],

    testFramework: 'jasmine',

    env: {
      runner: require('phantomjs-prebuilt').path,  // eslint-disable-line
      params: {runner: '--web-security=false'}
    },

    postprocessor: webpackPostprocessor,

    setup: () => window.__moduleBundler.loadTests()  // eslint-disable-line
  };
};
