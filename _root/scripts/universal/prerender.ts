import 'reflect-metadata';
// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { applyDomino } from '@nestjs/ng-universal';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ROUTES } from './static.paths';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const BROWSER_FOLDER = join(process.cwd(), 'browser');

// Load the index.html file containing references to your application bundle.
const indexPath = join('browser', 'index.html');
// Ensure that we mock Window|Document etc
applyDomino(global, indexPath);

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require('../../_root/demo/dist/server/main');

let previousRender = Promise.resolve();

// Iterate each route path
ROUTES.forEach(route => {
  const fullPath = join(BROWSER_FOLDER, route);

  // Make sure the directory structure is there
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath);
  }

  // Writes rendered HTML to index.html, replacing the file if it already exists.
  previousRender = previousRender
    .then(_ =>
      renderModuleFactory(AppServerModuleNgFactory, {
        document: readFileSync(indexPath, 'utf8'),
        url: route,
        extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
      })
    )
    .then(html => writeFileSync(join(fullPath, 'index.html'), html));
});
