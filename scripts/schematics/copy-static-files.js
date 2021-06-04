'use strict';
const extra = require('fs-extra');
const RELATIVE_PATH = process.cwd();
const DEST = `${RELATIVE_PATH}/dist`;
const SCHEMATICS = `${DEST}/schematics`;

// 1. Copy built schematics to 'dist'
extra.copyFileSync(`${RELATIVE_PATH}/schematics/src/collection.json`, `${SCHEMATICS}/collection.json`);
extra.copyFileSync(`${RELATIVE_PATH}/schematics/src/ng-add/schema.json`, `${SCHEMATICS}/ng-add/schema.json`);

