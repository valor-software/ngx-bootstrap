'use strict';
const path = require('path');
const execa = require('execa');
const fs = require('fs-extra');
const del = require('del');
const inlineResources = require('ngm-cli/helpers/inline-resources');
const bundleUmd = require('ngm-cli/tasks/bundle-umd.task');
const src = 'src';
const tmp = '.tmp';
const dist = 'dist-es2015';
const tsconfigPath = '.tmp/tsconfig.json';

const tsconfigCommon = `{
  "compilerOptions": {
    "outDir": "../../dist",
    "rootDir": "../",
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "inlineSources": true,
    "noEmitHelpers": false,
    "noImplicitAny": true,
    "declaration": true,
    "skipLibCheck": false,
    "stripInternal": true,
    "strictNullChecks": false,
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "lib": ["dom", "es6"],
    "types": [
      "jasmine"
    ]
  },
  "exclude": [
    "node_modules"
  ],
  "files": [
    "./index.ts"
  ],
  "angularCompilerOptions": {
    "genDir": "../temp/factories",
    "strictMetadataEmit": true,
    "skipTemplateCodegen": true,
    "fullTemplateTypeCheck": true
  }
}
`;

async function buildAll() {
  console.log('building all modules as separate bundles');
  await del(tmp);
  console.log('Copying src to temp folder');
  fs.copySync(src, tmp);
  const modules = fs.readdirSync(tmp).filter(filterModules);
  console.log(modules);
  console.log('Inlining templates and styles');
  await inlineResources.inlineResources(tmp);
  // console.log('Compiling root');
  // await execa('ngm build', ['-p', tmp], { preferLocal: true });
  console.log('Compiling libraries from temp folder');
  for (let module of modules) {
    console.log('Compiling', module);
    await execa('ngc', ['-p', path.join(tmp, module)], { preferLocal: true });
    console.log('Building umd bundle of', module);
    bundleUmd.bundleUmd({src: path.join(tmp, module), dist: 'dist', name: module, main: 'index.ts', tsconfig: path.join(tmp, module, 'tsconfig.json'), minify: false})
    console.log('');
    console.log('Bundle ESM5 bundle of', module);
    createEsBundle(path.join(tmp, module), module, {module: 'es6'}, 'esm5');
    console.log('Bundle ES2015 bundle of', module);
    createEsBundle(path.join(tmp, module), module, {target: 'es2015'}, 'es2015');
    generateTypings(module, 'dist');
    generatePackageJson(module, path.join('dist', module));
  }

}
buildAll();

function filterModules(module) {
  if (fs.lstatSync(path.join(tmp, module)).isDirectory() && module !== 'spec') {
    fs.writeFileSync(path.join(tmp, module, 'tsconfig.json'), tsconfigCommon, 'utf8');
    return true;
  }
  return false;

}

async function createEsBundle(tsconfigPath, module, tsconfigOptions, suffix) {
  const tsconfig = require(path.resolve(tsconfigPath, 'tsconfig.json'));
  const newTsConfig = path.join(tsconfigPath, `tsconfig.${suffix}.json`);
  Object.keys(tsconfigOptions).forEach((key) => {
    tsconfig.compilerOptions[key] = tsconfigOptions[key];
  });
  tsconfig.compilerOptions.outDir = `../dist-${suffix}`;
  await fs.writeFile(newTsConfig, JSON.stringify(tsconfig), 'utf8');
  await execa('ngc', ['-p', newTsConfig], { preferLocal: true });
  await execa('rollup --config ./scripts/es2015/es.config.js -i ' + `.tmp/dist-${suffix}/` + module + '/index.js' + ` -o dist/${suffix}/` + module + `.${suffix}.js`, { shell: true });
}

async function generateTypings(module, outDir) {
  const typings = `export * from './${module}/index';`
  await fs.writeFile(`${path.join(outDir, module + '.d.ts')}`, typings, 'utf8');
}

async function generatePackageJson(module, dir) {
  const packageJson = `{
  "name": "ngx-bootstrap/${module}",
  "typings": "../${module}.d.ts",
  "main": "../bundles/${module}.umd.js",
  "module": "../esm5/${module}.es5.js",
  "es2015": "../es2015/${module}.es2015.js"
}`;
  await fs.writeFile(`${path.join(dir, 'package.json')}`, packageJson, 'utf8');
}
