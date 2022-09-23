const { getJestProjects } = require('@nrwl/jest');

export default {
  setupFilesAfterEnv: ['<rootDir>/scripts/jest/toHaveCssClass.ts'],
  projects: getJestProjects()
};
