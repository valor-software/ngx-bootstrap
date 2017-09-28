// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

const customLaunchers = require('./scripts/sauce-browsers').customLaunchers;

module.exports = function (config) {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    files: [
      {pattern: './scripts/test.ts', watched: false}
    ],
    preprocessors: {
      './scripts/test.ts': ['@angular/cli']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['dots', 'coverage-istanbul']
      : ['dots', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'ChromeHeadless',
        flags: ['--disable-translate', '--disable-extensions']
      }
    },
    mime: { 'text/x-typescript': ['ts','tsx'] },
    client: { captureConsole: true, clearContext: false }
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeHeadless'];
  }

  if (process.env.SAUCE) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
      process.exit(1);
    }

    configuration.plugins.push(require('karma-sauce-launcher'));
    configuration.reporters.push('saucelabs');
    configuration.sauceLabs = {
      startConnect: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      verbose: true,
      testName: 'ng2-bootstrap unit tests',
      recordScreenshots: false,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
      },
      public: 'public'
    };
    configuration.captureTimeout = 0;
    configuration.customLaunchers = customLaunchers();
    configuration.browsers = Object.keys(configuration.customLaunchers);
    configuration.concurrency = 3;
    configuration.browserDisconnectTolerance = 2;
    configuration.browserNoActivityTimeout = 20000;
    configuration.browserDisconnectTimeout = 5000;
  }

  config.set(configuration);
};
