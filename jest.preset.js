const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset, ...{
    coverageReporters: ['text-summary', 'json', 'lcov']
  }
};
