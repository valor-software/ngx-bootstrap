/* eslint no-var:0 */
'use strict';
var pkg = require('./package.json');

module.exports = {
  // metadata
  title: pkg.description,
  baseUrl: '/',
  // root folder name
  src: 'demo',
  dist: 'demo-build',
  htmlIndexes: ['index.html', 'index-bs4.html'],
  // karma bundle src
  spec: './spec-bundle.js',
  // webpack entry
  entry: {
    polyfills: './demo/polyfills.ts',
    vendor: './demo/vendor.ts',
    main: './demo/index.ts'
  },
  commonChunks: {
    name: ['polyfills', 'vendor'].reverse()
  },
  // webpack alias
  alias: {},
  copy: [
    {from: 'demo/favicon.ico', to: 'favicon.ico'},
    {from: 'demo/assets', to: 'assets'}
  ]
};
