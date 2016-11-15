// todo: added
// configurable defaults
let mode = 'development'; // 'production'
const _ = require('lodash');
const defaultConfigName = 'angular-cli.json';
const pkgFileName = 'package.json';

const devOutDir = 'node_modules';
const bundlesDir = 'bundles';

const path = require('path');
const rootFolder = process.cwd();

const angularCliJson = require(path.resolve(rootFolder, defaultConfigName));
const moduleConf = angularCliJson.module[0];

const outDir = path.resolve(rootFolder, devOutDir, moduleConf.name);
// const outDir = mode === 'development'
//   ? path.resolve(rootFolder, devOutDir, moduleConf.name)
//   : path.resolve(rootFolder, moduleConf.outDir);

// single run <--> watch

// clean -> build ngc + build bundle -> copy package.json
const cpy = require('cpy');
const del = require('del');

// pyramid of dom! I hate promises ;)
clean(outDir)
  .then((res) => {
    console.log('cleaned ', res);
    buildNgc()
      .then(() => {
        console.log('ngc builded');
        copyPkg()
          .then(() => {
            return bundle().then(() => {
              mode = 'production';
              return bundle();
            });
          })
          .then(() => console.log('done'));
      })
  });

function clean(_outDir) {
  console.log(`cleaning ${_outDir}`);
  return del(_outDir);
}
function buildNgc() {
  require('reflect-metadata');

  // const ts = require('typescript');
  const tsc = require('@angular/tsc-wrapped');
  const CodeGenerator = require('@angular/compiler-cli').CodeGenerator;

  function codegen(ngOptions/*: tsc.AngularCompilerOptions*/, cliOptions/*: tsc.NgcCliOptions*/, program/*: ts.Program*/,
                   host/*: ts.CompilerHost*/) {
    return CodeGenerator
      .create(ngOptions, cliOptions, program, host)
      .codegen({transitiveModules: true});
  }

// CLI entry point
//   if (require.main === module) {
//     const args = require('minimist')(process.argv.slice(2));
//     const project = args.p || args.project || '.';
  const project = moduleConf.root;
  const cliOptions = new tsc.NgcCliOptions({});
  return tsc
    .main(project, cliOptions, codegen)
    // .then(exitCode => process.exit(exitCode))
    .catch(e => {
      console.error(e.stack);
      console.error('Compilation failed');
      process.exit(1);
    });
  // }
}

function copyPkg() {
  const fs = require('fs');
  // read base package.json
  const basePkg = require(path.resolve(rootFolder, pkgFileName));
  // read package.json in module root folder
  const modulePkgPath = path.resolve(rootFolder, moduleConf.root, pkgFileName);
  let modulePkg = fs.existsSync(modulePkgPath) ? require(modulePkgPath) : {};
  // read only needed fields from main package.json
  const fieldsToCopy = 'main version description main module typings browser keywords author license repository'.split(' ');
  const filteredBasePkg = _.pick(basePkg, fieldsToCopy);
  // read dependencies from main package.json
  const depsKeys = ['dependencies', 'devDependencies', 'peerDependencies'];
  const dependenciesHash = _(basePkg)
    .pick(depsKeys)
    .reduce((memo, v) => Object.assign(memo, v), {});

  // update sub module package.json dependencies versions
  const newModulePkg = Object.assign(modulePkg, filteredBasePkg);
  _.each(depsKeys, (section) => {
    newModulePkg[section] = _.mapValues(newModulePkg[section], (version, dependency) => dependenciesHash[dependency]);
  });

  // write to target directory
  return new Promise((resolve) => {
    fs.writeFileSync(
      path.resolve(rootFolder, outDir, pkgFileName),
      JSON.stringify(newModulePkg, null, '  ')
    );

    resolve()
  });
}

// Configure build and output;
let lastHash = null;
const webpackOutputOptions = {
  colors: true,
  chunks: true,
  modules: false,
  reasons: false,
  chunkModules: false
};
const webpack = require('webpack');

function bundle() {
  const config = require('./webpack.config.js')({
    name: mode === 'development' ? `${moduleConf.name}.umd` : `${moduleConf.name}.umd.min`,
    root: path.resolve(rootFolder, moduleConf.root),
    entry: path.resolve(rootFolder, moduleConf.root, moduleConf.main),
    output: path.resolve(outDir, bundlesDir),
    tsconfig:path.join(moduleConf.root, moduleConf.tsconfig || 'tsconfig.json')
  });

  if (mode === 'production') {
    config.plugins.unshift(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }));
    /*config.plugins.unshift(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));*/
  }
  const webpackCompiler = webpack(config);

  const ProgressPlugin = require('webpack/lib/ProgressPlugin');

  webpackCompiler.apply(new ProgressPlugin({
    profile: true
  }));

  return new Promise((resolve, reject) => {
    webpackCompiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      if (stats.hash !== lastHash) {
        lastHash = stats.hash;
        process.stdout.write(stats.toString(webpackOutputOptions) + '\n');
      }

      return stats.hasErrors() ? reject() : resolve();
    });
  });
}
