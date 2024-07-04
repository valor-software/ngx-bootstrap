import { test as base } from '@playwright/test';
import { AlertsPo } from '../support/alerts.po';

const test = base.extend<{ alertsPo: AlertsPo }>({
  alertsPo: async ({ page }, use) => {
    const alertsPo = new AlertsPo(page);
    await use(alertsPo);
  },
});

test.describe('Alerts page testing suite', () => {
  let tabSelector: string;

  test.beforeEach(async ({ alertsPo }) => {
    tabSelector = alertsPo.getTabSelector('Overview');
    await alertsPo.navigateTo();
  });

  test.describe('Basic', () => {
    let basic: string;

    test.beforeEach(async ({ alertsPo }) => {
      basic = tabSelector + alertsPo.exampleDemosArr.basic;
    });

    test('example contains success, info, warning and danger types of alerts', async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(basic, 'success');
      await alertsPo.expectAlertVisible(basic, 'info');
      await alertsPo.expectAlertVisible(basic, 'warning');
      await alertsPo.expectAlertVisible(basic, 'danger');
    });
  });
});
