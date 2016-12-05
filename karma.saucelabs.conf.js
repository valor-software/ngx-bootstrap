module.exports = function (config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  var customLaunchers = {
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
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-sauce-launcher'),
      require('karma-jasmine'),
      require('karma-chrome-launcher')
    ],
    files: [
      './src/**/*.spec.ts'
    ],
    reporters: ['progress', 'saucelabs'],
    port: 9876,
    colors: true,
    saucelabs: {
      testName: 'ng2-bootstrap unit tests',
      recordScreenshots: false,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      verbose: false,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
      },
      public: 'public'
    },
    captureTimeout: 0,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
