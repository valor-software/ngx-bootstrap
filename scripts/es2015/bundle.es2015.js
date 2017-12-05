"use strict";
const path = require('path');
const execa = require('execa');
const fs = require('fs-extra');
const del = require('del');
const inlineResources = require('ngm-cli/helpers/inline-resources');
const src = 'src';
const tmp = '.tmp';
const dist = 'dist-es2015';
const tsconfigPath = '.tmp/tsconfig.json';

fs.copy(src, tmp)
  .then(() => {
    console.log('Copying src to temp folder');
    const tsconfig = require(path.resolve(tsconfigPath));
    tsconfig.compilerOptions.target = 'es2015';
    tsconfig.compilerOptions.outDir = '../' + dist;
    return fs.writeFile(tsconfigPath, JSON.stringify(tsconfig), 'utf8')
  })
  .then(() => {
    console.log('Inlining templates and styles');
    return inlineResources.inlineResources(tmp);
  })
  .then(() => {
    console.log('Compiling library from temp folder');
    return execa('ngc', ['-p', tmp], { preferLocal: true });
  })
  .then(() => {
    console.log('Bundling es2015 bundle');
    return execa('rollup --config ./scripts/es2015/es2015.config.js', { shell: true });
  })
  .then(() => {
    console.log('Removing temp folders');
    del([tmp, dist]);
  });

