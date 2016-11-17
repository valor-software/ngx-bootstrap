/**
 * @author: @AngularClass
 */

module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.js')({env: 'test'});

  var configuration = {
    basePath: '',

    frameworks: ['jasmine'],

    exclude: [ ],

    // files: [ './src/**/*.spec.ts' ],
    files: [ { pattern: './spec-bundle.js', watched: false } ],

    preprocessors: { './spec-bundle.js': ['webpack', 'sourcemap'] },

    webpack: testWebpackConfig,

    coverageReporter: {
      type: 'in-memory'
    },

    webpackMiddleware: { stats: 'errors-only'},

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: [
      'Chrome'
    ],

    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    singleRun: true
  };

  if (process.env.TRAVIS) {
    configuration.browsers = [
      'ChromeTravisCi'
    ];
  }

  config.set(configuration);
};
