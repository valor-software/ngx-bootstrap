'use strict';
const path = require('path');
const execa = require('execa');
const fs = require('fs-extra');
const del = require('del');
const inlineResources = require('ngm-cli/helpers/inline-resources');
const src = 'src';
const tmp = '.tmp';
const dist = 'dist-es2015';
const tsconfigPath = '.tmp/tsconfig.json';

async function createEs2015Bundle() {
  await del(tmp);
  console.log('Copying src to temp folder');
  await fs.copy(src, tmp);
  const tsconfig = require(path.resolve(tsconfigPath));
  tsconfig.compilerOptions.target = 'es2015';
  tsconfig.compilerOptions.outDir = '../' + dist;
  await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig), 'utf8');
  console.log('Inlining templates and styles');
  await inlineResources.inlineResources(tmp);
  console.log('Compiling library from temp folder');
  await execa('ngc', ['-p', tmp], { preferLocal: true });
  console.log('Bundling es2015 bundle');
  await execa('rollup --config ./scripts/es2015/es2015.config.js', { shell: true });
  console.log('Removing temp folders');
  await del([tmp, dist]);
}
createEs2015Bundle();

