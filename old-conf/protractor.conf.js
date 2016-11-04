'use strict';

exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  useAllAngular2AppRoots: true,

  baseUrl: 'http://localhost:3000/',

  multiCapabilities: [
    {
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 1
    }

    /*{
     browserName: 'firefox',
     shardTestFiles: true,
     maxInstances: 4
     }*/
  ],

  specs: [
    // './tests_e2e/tests/*.e2e.js'
    './tests_e2e/tests/accordion-demo.e2e.js'
    // './tests_e2e/tests/modals-demo.e2e.js'
  ],

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 80000
  }
};
