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
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-sauce-launcher')
    ],
    files: [
      {pattern: './scripts/test.ts', watched: false}
    ],
    preprocessors: {
      './scripts/test.ts': ['@angular/cli']
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
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
    browsers: ['ChromeHeadless'],
    browserNoActivityTimeout: 20000,
    browserDisconnectTolerance: 2,
    browserDisconnectTimeout: 5000,
    singleRun: false,
    customLaunchers: {
      Chrome_travis_ci: {
          base: 'ChromeHeadless',
          flags: [
              '--headless',
              '--disable-gpu',
              '--no-sandbox',
              '--remote-debugging-port=9222'
          ]
      }
    },
    mime: {'text/x-typescript': ['ts', 'tsx']},
    client: {captureConsole: true, clearContext: false}
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  if (process.env.SAUCE) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
      process.exit(1);
    }

    configuration.plugins.push(require('karma-sauce-launcher'));
    Object.assign(configuration, {
      logLevel: config.LOG_INFO,
      reporters: ['dots', 'saucelabs'],
      singleRun: false,
      concurrency: 2,
      captureTimeout: 60000,
      sauceLabs: {
        testName: 'ngx-bootstrap',
        build: process.env.TRAVIS_JOB_NUMBER,
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        retryLimit: 5,
        startConnect: false,
        recordVideo: false,
        recordScreenshots: false,
        options: {
          'command-timeout': 600,
          'idle-timeout': 600,
          'max-duration': 5400
        }
      },
      customLaunchers: {
        'SL_CHROME': {
          base: 'SauceLabs',
          browserName: 'chrome',
          version: 'latest'
        },
        'SL_CHROME_1': {
          base: 'SauceLabs',
          browserName: 'chrome',
          version: 'latest-1'
        },
        'SL_FIREFOX': {
          base: 'SauceLabs',
          browserName: 'firefox',
          version: 'latest'
        },
        'SL_FIREFOX_1': {
          base: 'SauceLabs',
          browserName: 'firefox',
          version: 'latest-1'
        },
        'SL_IE10': {
          base: 'SauceLabs',
          browserName: 'internet explorer',
          // platform: 'Windows 2012',
          version: '10'
        },
        'SL_IE11': {
          base: 'SauceLabs',
          browserName: 'internet explorer',
          platform: 'Windows 8.1',
          version: '11.0'
        },
        'SL_EDGE13': {
          base: 'SauceLabs',
          browserName: 'MicrosoftEdge',
          platform: 'Windows 10',
          version: '13'
        },
        'SL_EDGE14': {
          base: 'SauceLabs',
          browserName: 'MicrosoftEdge',
          platform: 'Windows 10',
          version: '14'
        },
        'SL_EDGE15': {
          base: 'SauceLabs',
          browserName: 'MicrosoftEdge',
          platform: 'Windows 10',
          version: '15'
        },
        'SL_SAFARI9': {
          base: 'SauceLabs',
          browserName: 'safari',
          // platform: 'OS X 10.11',
          version: '9.0'
        },
        'SL_SAFARI10': {
          base: 'SauceLabs',
          browserName: 'safari',
          // platform: 'OS X 10.11',
          version: '10.0'
        }
      }
    });


    configuration.browsers = Object.keys(configuration.customLaunchers);
  }

  config.set(configuration);
};
