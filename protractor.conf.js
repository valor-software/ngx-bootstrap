'use strict';

const env = require('./environment.js');

exports.config = {
  seleniumAddress: env.seleniumAddress,

  useAllAngular2AppRoots: true,

  baseUrl: 'http://localhost:3000/',

  capabilities: env.capabilities,

  specs: [
    './e2e/test_e2e.ts'
  ],

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 80000
  }
};

// // look in ./config for protractor.conf.js
// module.exports.config = require('./config/protractor.conf.js').config;
