// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = require('./karma.base.conf')({
  coverageIstanbulReporter: {
    dir: require('path').join(__dirname, 'coverage/demo'),
    reports: ['html', 'lcovonly', 'text'],
    fixWebpackSourcePaths: true
  },
  port: 9876,
});
