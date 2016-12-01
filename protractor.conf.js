// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './demo/e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {browserName: 'chrome'},
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch() {
    require('ts-node').register({project: 'demo/e2e'});
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
