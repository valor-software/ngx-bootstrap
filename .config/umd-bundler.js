#!/usr/bin/env node

'use strict';

/*eslint no-console: 0, no-sync: 0*/

// UMD bundler
// simple and yet reusable system.js bundler
// bundles, minifies and gzips

const fs = require('fs');
const del = require('del');
const path = require('path');
const zlib = require('zlib');
const async = require('async');
const Builder = require('systemjs-builder');

const pkg = require('../package.json');
const name = pkg.name;
const targetFolder = path.resolve('./bundles');

async.waterfall([
  cleanBundlesFolder,
  getSystemJsBundleConfig,
  buildSystemJs({minify: false, sourceMaps: true, mangle: false, noEmitHelpers: false, declaration: true}),
  getSystemJsBundleConfig,
  buildSystemJs({minify: true, sourceMaps: true, mangle: false, noEmitHelpers: false, declaration: true})
], err => {
  if (err) {
    throw err;
  }
});

function getSystemJsBundleConfig(cb) {
  const config = {
    baseURL: '.',
    transpiler: 'typescript',
    typescriptOptions: {
      module: 'cjs'
    },
    map: {
      typescript: './node_modules/typescript/lib/typescript',
      '@angular': './node_modules/@angular',
      rxjs: './node_modules/rxjs'
    },
    paths: {
      '*': '*.js'
    },
    meta: {
      './node_modules/@angular/*': {build: false},
      './node_modules/rxjs/*': {build: false},
      moment: {build: false}
    }
  };

  return cb(null, config);
}

function cleanBundlesFolder(cb) {
  return del(targetFolder)
    .then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
      cb();
    });
}

function buildSystemJs(options) {
  return (config, cb) => {
    const minPostFix = options && options.minify ? '.umd.min' : '.umd';
    const fileName = `${name}${minPostFix}.js`;
    const dest = path.resolve(__dirname, targetFolder, fileName);
    const builder = new Builder();

    console.log('Bundling system.js file:', fileName, options);
    builder.config(config);

    return builder
      .buildStatic(name, dest, {format: 'umd'})
      .then(() => {
        console.log('Build complete.');
        cb();
      })
      .catch(err => {
        console.log('Error', err);
        cb();
      });
  };
}
