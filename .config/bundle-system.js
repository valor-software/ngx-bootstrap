#!/usr/bin/env node

'use strict';

/*eslint no-console: 0, no-sync: 0*/

// System.js bundler
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
  buildSystemJs({minify: true, sourceMaps: true, mangle: false, noEmitHelpers: false, declaration: true}),
  gzipSystemJsBundle
], err => {
  if (err) {
    throw err;
  }
});

function getSystemJsBundleConfig(cb) {
  const config = {
    baseURL: '..',
    transpiler: 'typescript',
    typescriptOptions: {
      module: 'cjs'
    },
    map: {
      typescript: './node_modules/typescript/lib/typescript',
      '@angular/core': './node_modules/@angular/core/index',
      '@angular/common': './node_modules/@angular/common/index',
      '@angular/compiler': './node_modules/@angular/compiler/index',
      '@angular/forms': './node_modules/@angular/forms/index',
      '@angular/platform-browser': './node_modules/@angular/platform-browser/index',
      '@angular/platform-browser-dynamic': './node_modules/@angular/platform-browser-dynamic/',
      rxjs: './node_modules/rxjs'
    },
    paths: {
      '*': '*.js'
    }
  };

  config.meta = ['@angular/common','@angular/compiler','@angular/core', '@angular/forms',
    '@angular/platform-browser','@angular/platform-browser-dynamic', 'rxjs'].reduce((memo, currentValue) => {
    memo[`./node_modules/${currentValue}/*`] = {build: false};
    return memo;
  }, {});
  config.meta.moment = {build: false};
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
    const minPostFix = options && options.minify ? '.min' : '';
    const fileName = `${name}${minPostFix}.js`;
    const dest = path.resolve(__dirname, targetFolder, fileName);
    const builder = new Builder();

    console.log('Bundling system.js file:', fileName, options);
    builder.config(config);
    return builder
      .bundle([name, name].join('/'), dest, options)
      .then(() => cb())
      .catch((err) => {
        console.log('Build error!');
        console.log(err);
        cb();
      });
  };
}

function gzipSystemJsBundle(cb) {
  const files = fs
    .readdirSync(path.resolve(targetFolder))
    .map(file => path.resolve(targetFolder, file))
    .filter(file => fs.statSync(file).isFile())
    .filter(file => path.extname(file) !== 'gz');

  return async.eachSeries(files, (file, gzipcb) => {
    process.nextTick(() => {
      console.log('Gzipping ', file);
      const gzip = zlib.createGzip({level: 9});
      const inp = fs.createReadStream(file);
      const out = fs.createWriteStream(`${file}.gz`);

      inp.on('end', () => gzipcb());
      inp.on('error', err => gzipcb(err));
      return inp.pipe(gzip).pipe(out);
    });
  }, cb);
}
