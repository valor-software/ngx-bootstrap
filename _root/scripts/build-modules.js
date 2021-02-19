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
const path = require('path');

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

//   await execa.shell(`npm run link`);

  const requiredModules = ['collapse', 'chronos', 'utils', 'positioning', 'component-loader', 'dropdown', 'locale',
    'alert', 'buttons', 'carousel', 'mini-ngrx', 'modal', 'pagination', 'popover', 'progressbar', 'rating',
    'sortable', 'tabs', 'timepicker', 'tooltip', 'typeahead', 'datepicker', 'accordion'];

  await buildModules(requiredModules);

  await execa.shell(`rsync -avr  --include='*/' --include='*.scss' --exclude='*' ${src}/datepicker ${dist}`);
}

const cli = meow(`
	Options
	  --watch Rebuild on source change
	  --latest required for Latest & Next Env
	  --windows for development with OS Windows
`, {
  flags: {
    watch: {
      type: 'boolean'
    },
    latest: {
      type: 'boolean'
    },
    windows: {
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
      let moduleName = event.replace(new RegExp(`src\\${path.sep}(.*)\\${path.sep}(.*)`,'i'), '$1');
      buildModules([moduleName])
    });
}

buildAll();

async function buildModules(modules) {
  for (let module of modules) {
    console.log('Building', module, 'module');
    await execa.shell(`rimraf ${dist}/${module} && node scripts/ng-packagr/api ../../src/${module}/package.json`);

    if (flags.latest) {
      await execa.shell(`npm run dist-to-modules.deploy`);
    } if (flags.windows) {
      await execa.shell(`npm run dist-to-modules.windows`);
    } else {
      await execa.shell(`npm run dist-to-modules`);
    }
    console.log(`Build of ${module} module completed`);
  }
}
