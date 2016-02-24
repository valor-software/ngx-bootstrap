#!/usr/bin/env node
/*eslint no-console: 0, no-sync: 0*/
'use strict';

var cpy = require('cpy');

var tsSource = [
  '**/*.ts',
  '!**/*.d.ts',
  '!node_modules/**/*.ts',
  '!demo/**/*.ts'
];

cpy(tsSource, 'ts', {parents: true});
