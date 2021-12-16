const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/scripts/jest/toHaveCssClass.ts'],
  projects: getJestProjects(),
};
