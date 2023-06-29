import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  workers: 3,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4200/ngx-bootstrap/',
    headless: true
  },

  projects: [
    {
      name: 'chromium-integration',
      use: { ...devices['Desktop Chrome'] },
      testDir: './src/integration'
    },
    {
      name: 'chromium-full',
      use: { ...devices['Desktop Chrome'] },
      testDir: './src/full'
    },
    {
      name: 'chromium-all',
      use: { ...devices['Desktop Chrome'] },
      testDir: './src'
    }
  ],
});
