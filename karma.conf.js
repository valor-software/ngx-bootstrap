'use strict';

const path = require('path');
const cwd = process.cwd();

module.exports = config => {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'test.bundle.js', watched: false}
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test.bundle.js': ['coverage', 'webpack', 'sourcemap']
    },

    webpack: {
      resolve: {
        root: [path.resolve(cwd)],
        modulesDirectories: ['node_modules', 'demo', 'components', 'test', '.'],
        extensions: ['', '.ts', '.js', '.css']
      },
      module: {
        loaders: [
          {test: /\.ts$/, loader: 'ts-loader', exclude: [/node_modules/]}
        ],
        postLoaders: [
          // instrument only testing sources with Istanbul
          {
            test: /\.(js|ts)$/,
            include: root('components'),
            loader: 'istanbul-instrumenter-loader',
            exclude: [
              /\.e2e\.ts$/,
              /node_modules/
            ]
          }
        ]
      },
      stats: {
        colors: true,
        reasons: true
      },
      watch: true,
      debug: true
    },

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text'},
        {type: 'json'},
        {type: 'html'}
      ]
    },
    webpackServer: {noInfo: true},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};

function root(partialPath) {
  return path.join(__dirname, partialPath);
}
