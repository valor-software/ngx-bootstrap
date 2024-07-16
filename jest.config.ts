const { getJestProjects } = require('@nx/jest');

export default {
  setupFilesAfterEnv: ['<rootDir>/scripts/jest/toHaveCssClass.ts'],
  projects: getJestProjects()
};
