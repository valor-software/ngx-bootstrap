const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  ...{
    coverageReporters: ['text-summary', 'json', 'lcov']
  }
};
