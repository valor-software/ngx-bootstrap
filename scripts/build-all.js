'use strict';
const path = require('path');
const execa = require('execa');
const fs = require('fs-extra');
const del = require('del');
const inlineResources = require('ngm-cli/helpers/inline-resources');
const bundleUmd = require('ngm-cli/tasks/bundle-umd.task');
const src = 'src';
const tmp = '.tmp';
const dist = 'dist';
const tsconfigPath = '.tmp/tsconfig.json';

async function buildAll() {
  console.log('Building all modules as separate bundles');
  await del(tmp);
  console.log('Copying src to temp folder');
  fs.copySync(src, tmp);
  let modules = fs.readdirSync(tmp).filter(filterModules);
  console.log('Inlining templates and styles');
  await inlineResources.inlineResources(tmp);
  console.log('Compiling libraries from temp folder');
  // modules = ['collapse', 'accordion', 'alert'];
  // modules.splice(modules.indexOf('datepicker'), 1);
  // modules = ['mini-ngrx', 'chronos', 'timepicker', 'datepicker'];
  for (let module of ['mini-ngrx', 'collapse', ...modules]) {
    console.log('Compiling', module);
    await execa.shell(`ngc -p ${path.join(tmp, module)}`, { preferLocal: true });
    console.log('Building umd bundle of', module);
    bundleUmd.bundleUmd({src: path.join(tmp, module), dist: 'dist', name: module, main: 'index.ts', tsconfig: path.join(tmp, module, 'tsconfig.json'), minify: false});
    console.log('');
    // console.log('Bundle ESM5 bundle of', module);
    // createEsBundle(path.join(tmp, module), module, {module: 'es6'}, 'esm5');
    // console.log('Bundle ES2015 bundle of', module);
    // createEsBundle(path.join(tmp, module), module, {target: 'es2015'}, 'es2015');
    generateTypings(module, 'dist');
    generateMetadata(module, 'dist');
    generatePackageJson(module, path.join('dist', module));
  }
  console.log('Compiling root');
  await execa.shell('npm run build.ngm', { preferLocal: true }).stdout.pipe(process.stdout);
  console.log('Bundle ESM5 bundle of ngx-bootstrap');
  await createEsBundle(tmp, 'ngx-bootstrap', {module: 'es6'}, 'esm5');
  console.log('Bundle ES2015 bundle of ngx-bootstrap');
  await createEsBundle(tmp, 'ngx-bootstrap', {target: 'es2015'}, 'es2015');
  await removeJsFiles();

}
buildAll();

function filterModules(module) {
  if (fs.lstatSync(path.join(tmp, module)).isDirectory() && module !== 'spec') {
    fs.writeFileSync(path.join(tmp, module, 'tsconfig.json'), getTsConfigForModule(module), 'utf8');
    return true;
  }
  return false;

}

async function createEsBundle(tsconfigPath, module, tsconfigOptions, suffix) {
  const isRootModule = tsconfigPath === tmp;
  const tsconfig = require(path.resolve(tsconfigPath, 'tsconfig.json'));
  const newTsConfig = path.join(tsconfigPath, `tsconfig.${suffix}.json`);
  Object.keys(tsconfigOptions).forEach((key) => {
    tsconfig.compilerOptions[key] = tsconfigOptions[key];
  });
  tsconfig.compilerOptions.outDir = isRootModule ? `./dist-${suffix}` : `../dist-${suffix}`;
  await fs.writeFile(newTsConfig, JSON.stringify(tsconfig), 'utf8');
  await execa('ngc', ['-p', newTsConfig], { preferLocal: true });
  // await execa('rollup --config ./scripts/es2015/es.config.js -i ' + `.tmp/dist-${suffix}/` +  (isRootModule ? '' : module + '/') + 'index.js' + ` -o dist/${suffix}/` + module + `.${suffix}.js`, { shell: true });
}

async function generateTypings(module, outDir) {
  const typings = `export * from './${module}/index';`;
  await fs.writeFile(`${path.join(outDir, module + '.d.ts')}`, typings, 'utf8');
}

async function generateMetadata(module, outDir) {
  const metadata = `{
  "__symbolic": "module",
  "version": 3,
  "metadata": {},
  "exports": [
    {
      "from": "./${module}/index"
    }
  ],
  "flatModuleIndexRedirect": true,
  "importAs": "ngx-bootstrap/${module}"
}`;
  await fs.writeFile(`${path.join(outDir, module + '.metadata.json')}`, metadata, 'utf8');
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

async function removeJsFiles() {
  const pathsToIgnore = ['bundles', 'esm5', 'es2015'];
  const ignorePatterns = [];
  pathsToIgnore.forEach(path => ignorePatterns.push(`!dist/${path}/*.js`, `!dist/${path}/*.map`));
  del(['dist/**/*.js', 'dist/**/*.map', ...ignorePatterns]);
}

function getTsConfigForModule(module) {
  return `{
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
    ],
    "baseUrl": ".",
    "paths": {
      "ngx-bootstrap/*": ["../../dist/*"]
    }
  },
  "exclude": [
    "node_modules"
  ],
  "files": [
    "public_api.ts"
  ],
  "angularCompilerOptions": {
    "genDir": "../temp/factories",
    "strictMetadataEmit": true,
    "skipTemplateCodegen": true,
    "fullTemplateTypeCheck": true,
    "flatModuleOutFile": "index.js",
    "flatModuleId": "ngx-bootstrap/${module}"
  }
}
`;
}
