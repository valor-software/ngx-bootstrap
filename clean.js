#!/usr/bin/env node
'use strict';

/*eslint no-console: 0, no-sync: 0*/
const del = require('del');

console.log(del.sync(['components/**/*.+(js|d.ts|js.map)']));
