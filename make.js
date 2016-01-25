#!/usr/bin/env node
/*eslint no-console: 0*/
var pkg = require('./package.json');
var path = require('path');
var Builder = require('systemjs-builder');
var name = pkg.name;

var builder = new Builder();
var config = {
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
  },
  meta: {}
};

config.meta[path.join(name, 'node_modules/angular2/*')] = {build: false};
config.meta[path.join(name, 'node_modules/rxjs/*')] = {build: false};

builder.config(config);

builder
  .bundle([name, name].join('/'), path.resolve(__dirname, 'bundles/', name + '.js'))
  .then(function () {
    var prodBuilder = new Builder();
    prodBuilder.config(config);

    prodBuilder
      .bundle([name, name].join('/'), path.resolve(__dirname, 'bundles/', name + '.min.js'), {
        minify: true, sourceMaps: true
      })
      .then(function () {
        console.log('Build complete.');
      });
  })
  .catch(function (err) {
    console.log('Error', err);
  });
