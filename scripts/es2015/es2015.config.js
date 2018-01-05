'use strict';
const fs = require('fs-extra');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const ROLLUP_GLOBALS = require('./rollup.globals');
const libName = 'ngx-bootstrap';
const PATH_SRC = 'dist-es2015/';
const PATH_DIST = 'dist/bundles/';

export default {
  input: PATH_SRC + 'index.js',
  output: {
    format: 'es',
    file: PATH_DIST + libName + '.es2015.js',
    sourcemap: true,
    name: libName
  },
  external: Object.keys(ROLLUP_GLOBALS),
  plugins: [
    resolve({
      module: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
    })
  ],
  onwarn: warning => {
    const skip_codes = [
      'THIS_IS_UNDEFINED',
      'MISSING_GLOBAL_NAME'
    ];
    if (skip_codes.indexOf(warning.code) != -1) return;
    console.error(warning);
  }
};
