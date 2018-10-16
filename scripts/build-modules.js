'use strict';

const meow = require('meow');
const execa = require('execa');
const fs = require('fs-extra');
const cpy = require('cpy');
const chokidar = require('chokidar');
const del = require('del');
const buildPkgJson = require('ngm-cli/tasks/npm/build-pkg-json.task');
const src = 'src';
const dist = 'dist';
const common = 'common';

let flags = {};

async function buildAll() {
  if (flags.watch) {
    console.log(`WATCH MODE ENABLED \n`);
  }

  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }

  await buildPkgJson.buildPkgJson({ src, dist });
  await execa.shell(`json -I -f ${dist}/package.json -e 'this.schematics="./schematics/collection.json"'`);
  cpy(['*.md', 'LICENSE'], dist);

  await execa.shell(`npm run link`);

  const requiredModules = ['collapse', 'chronos', 'utils', 'positioning', 'component-loader', 'dropdown', 'locale',
    'alert', 'buttons', 'carousel', 'mini-ngrx', 'modal', 'pagination', 'popover', 'progressbar',
    'rating', 'sortable', 'tabs', 'timepicker', 'tooltip', 'typeahead', 'datepicker'];

  await buildModules(requiredModules);

  console.log('Building accordion module');
  await execa.shell(`node scripts/ng-packagr/api ../../src/accordion/package.json`);
  console.log('Build of accordion module completed');

  await buildModules(['common']);

  await execa.shell(`rsync -a dist/common/. dist/ --exclude package.json`);
  await del(`${dist}/${common}`);
}

const cli = meow(`
	Options
	  --watch Rebuild on source change
`, {
  flags: {
    watch: {
      type: 'boolean'
    }
  }
});
flags = cli.flags;

if (flags.watch) {
  chokidar.watch(src, {
    ignored: /(^|[\/\\])\../
  })
    .on('change', (event) => {
      let moduleName = event.replace(/src\/(.*)\/.*/i, '$1');
      buildModules([moduleName])
    });
}

buildAll();

async function buildModules(modules) {
  for (let module of modules) {
    console.log('Building', module, 'module');
    await execa.shell(`rimraf ${dist}/${module} && ng-packagr -p src/${module}`);
    console.log(`Build of ${module} module completed`);
  }
}
