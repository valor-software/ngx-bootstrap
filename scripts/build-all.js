'use strict';
const meow = require('meow');
const path = require('path');
const execa = require('execa');
const fs = require('fs-extra');
const cpy = require('cpy');
const chokidar = require('chokidar');
const del = require('del');
const inlineResources = require('ngm-cli/helpers/inline-resources');
const buildPkgJson = require('ngm-cli/tasks/npm/build-pkg-json.task');
const src = 'src';
const tmp = '.tmp';
const dist = 'dist';
const ignoreFolders = ['spec', 'dist-es2015', 'dist-esm5'];
const {
  performance
} = require('perf_hooks');
let flags = {};

async function buildAll() {
  if (flags.dev) {
    console.log(`DEVELOPMENT MODE. Only specified bundles (UMD) will be created \n`);
  }
  if (flags.watch) {
    console.log(`WATCH MODE ENABLED \n`);
  }
  const t0 = performance.now();
  console.log('Building all modules as separate bundles');
  await del(tmp);
  console.log('Copying src to temp folder');
  fs.copySync(src, tmp);
  let modules = fs.readdirSync(tmp).filter(filterModules);
  console.log('Inlining templates and styles');
  await inlineResources.inlineResources(tmp);
  console.log('Compiling libraries from temp folder');
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
    buildPkgJson.buildPkgJson({src: tmp, dist: dist});
    cpy(['*.md', 'LICENSE'], dist);
    await execa.shell(`npm run link`, { preferLocal: true });
  }
  // build these first
  const requiredModules = ['utils', 'positioning', 'component-loader', 'mini-ngrx', 'chronos', 'collapse'];
  await buildModules(requiredModules);
  await buildModules(modules.filter(module => !requiredModules.includes(module)));
  console.log('Compiling root');
  await execa('ngc', ['-p', path.join(tmp)], { preferLocal: true });
  await execa(`rollup --config ./scripts/es2015/es.config.js -f umd -n ngx-bootstrap -i dist/index.js -o dist/bundles/ngx-bootstrap.umd.js`, { shell: true });
  await execa(`rollup --config ./scripts/es2015/es.min.config.js -f umd -n ngx-bootstrap -i dist/index.js -o dist/bundles/ngx-bootstrap.umd.min.js`, { shell: true });
  generateMainTypings(modules, dist);
  generateMainMetadata(modules, dist);
  if (!flags.dev) {
    console.log('Bundle ESM5 bundle of ngx-bootstrap');
    await createEsBundle(tmp, 'ngx-bootstrap', {module: 'es6'}, 'esm5');
    console.log('Bundle ES2015 bundle of ngx-bootstrap');
    await createEsBundle(tmp, 'ngx-bootstrap', {target: 'es2015'}, 'es2015');
  }
  await removeJsFiles();
  await del([tmp]);
  const t1 = performance.now();
  console.log(`Build took ${((t1 - t0) / 1000).toFixed()} seconds.`);
}

const cli = meow(`
	Options
	  --dev Bundle only UMD version
	  --watch Rebuild on source change
`, {
  flags: {
    dev: {
      type: 'boolean'
    },
    watch: {
      type: 'boolean'
    }
  }
});
flags = cli.flags;
buildAll();

if (flags.watch) {
  chokidar.watch(src, {ignored: /(^|[\/\\])\../}).on('change', (event) => {
    console.log(event);
    buildAll();
  });
}

function filterModules(module) {
  if (fs.lstatSync(path.join(tmp, module)).isDirectory() && !ignoreFolders.includes(module)) {
    fs.writeFileSync(path.join(tmp, module, 'tsconfig.json'), getTsConfigForModule(module), 'utf8');
    return true;
  }
  return false;

}

async function buildModules(modules) {
  for (let module of modules) {
    console.log('Compiling', module);
    await execa.shell(`ngc -p ${path.join(tmp, module)}`, { preferLocal: true });
    console.log('Building umd bundle of', module);
    await execa(`rollup --config ./scripts/es2015/es.config.js -f umd -n ngx-bootstrap/${module} -i dist/${module}/index.js -o dist/bundles/${module}.umd.js`, { shell: true });
    if (!flags.dev) {
      execa(`rollup --config ./scripts/es2015/es.min.config.js -f umd -n ngx-bootstrap/${module} -i dist/${module}/index.js -o dist/bundles/${module}.umd.min.js`, { shell: true });
      console.log('Bundle ESM5 bundle of', module);
      createEsBundle(path.join(tmp, module), module, {module: 'es6'}, 'esm5');
      console.log('Bundle ES2015 bundle of', module);
      createEsBundle(path.join(tmp, module), module, {target: 'es2015'}, 'es2015');
    }
    generateTypings(module, 'dist');
    generateMetadata(module, 'dist');
    generatePackageJson(module, path.join('dist', module));
    console.log('');
  }
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
  await execa('rollup --config ./scripts/es2015/es.config.js -i ' + `.tmp/dist-${suffix}/` +  (isRootModule ? '' : module + '/') + 'index.js' + ` -o dist/${suffix}/` + module + `.${suffix}.js`, { shell: true });
}

async function generateTypings(module, outDir) {
  const typings = `export * from './${module}/index';`;
  await fs.writeFileSync(`${path.join(outDir, module + '.d.ts')}`, typings, 'utf8');
}

async function generateMainTypings(modules, outDir) {
  let typings = '';
  modules.forEach(module => typings += `export * from './${module}';\n`);
  await fs.writeFileSync(`${path.join(outDir, 'ngx-bootstrap.d.ts')}`, typings, 'utf8');
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
  await fs.writeFileSync(`${path.join(outDir, module + '.metadata.json')}`, metadata, 'utf8');
}

async function generateMainMetadata(modules, outDir) {
  const exports = modules.map((module) => `{"from": "./${module}"}`);
  const metadata = `{
  "__symbolic": "module",
  "version": 3,
  "metadata": {},
  "exports": [${exports}],
  "flatModuleIndexRedirect": true,
  "importAs": "ngx-bootstrap"
}`;
  await fs.writeFileSync(`${path.join(outDir, 'ngx-bootstrap.metadata.json')}`, metadata, 'utf8');
}

async function generatePackageJson(module, dir) {
  const packageJson = `{
  "name": "ngx-bootstrap/${module}",
  "typings": "../${module}.d.ts",
  "main": "../bundles/${module}.umd.js",
  "module": "../esm5/${module}.es5.js",
  "es2015": "../es2015/${module}.es2015.js"
}`;
  await fs.writeFileSync(`${path.join(dir, 'package.json')}`, packageJson, 'utf8');
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
