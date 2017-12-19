import '../demo/src/polyfills.ts';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import './matchers';
import { environment } from '../demo/src/environments/environment.qa';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = Function.prototype;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

if (environment.demo) {
// Then we find all the tests for demo.
  let context = require.context('../demo/src', true, /\.spec\.ts/);
// And load the demo modules.
  context.keys().map(context);
}
if (environment.src) {
  // Then we find all the tests for src.
  let context2 = require.context('../src', true, /\.spec\.ts/);
  // And load the src modules.
  context2.keys().map(context2);
}

// Finally, start Karma to run the tests.
__karma__.start();
