process.env.SAUCE_USERNAME = 'valorkin';
process.env.SAUCE_ACCESS_KEY = 'aeaf806e-ad5c-484b-a8fe-4b4b9f54e99a';

module.exports = function (config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  const customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: "52.0",
      platform: "Windows 7"
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'Firefox',
      platform: 'Windows 7',
      version: '46.0'
    },
    sl_ie_8: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: "9.0",
      platform: "Windows 8"
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: "11.0",
      platform: "Windows 8.1"
    }
  };

  config.set({
    logLevel: config.LOG_DEBUG,
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-sauce-launcher'),
      require('karma-jasmine'),
      // require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      {pattern: './scripts/test.ts', watched: false}
    ],
    preprocessors: {
      './scripts/test.ts': ['angular-cli']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'karma-remap-istanbul', 'saucelabs']
      : ['dots', 'saucelabs'],
    port: 9876,
    colors: true,
    sauceLabs: {
      doctor: true,
      verbose: true,
      testName: 'ng2-bootstrap unit tests',
      recordScreenshots: true,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
      },
      public: 'public'
    },
    captureTimeout: 0,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    concurrency: 2,
    singleRun: true
  });
};
