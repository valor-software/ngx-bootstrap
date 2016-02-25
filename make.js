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

const pkg = require('./package.json');
const name = pkg.name;
const targetFolder = 'bundles';

async.waterfall([
  cleanBundlesFolder,
  getSystemJsBundleConfig,
  buildSystemJs({mangle: false}),
  getSystemJsBundleConfig,
  buildSystemJs({minify: true, sourceMaps: true, mangle: false}),
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
      typescript: path.resolve('node_modules/typescript/lib/typescript.js'),
      angular2: path.resolve('node_modules/angular2'),
      rxjs: path.resolve('node_modules/rxjs')
    },
    paths: {
      '*': '*.js'
    }
  };

  config.meta = ['angular2', 'rxjs'].reduce((memo, currentValue) => {
    memo[`${__dirname}/node_modules/${currentValue}/*`] = {build: false};
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
      .catch(cb);
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
