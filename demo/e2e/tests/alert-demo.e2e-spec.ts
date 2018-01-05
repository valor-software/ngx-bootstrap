import { $, $$, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

const using = require('jasmine-data-provider');

const buttonAddAlert = $('alert-demo .btn');
const alertWarning = $('[ng-reflect-ng-class="alert-warning"]');
const getAlertCount = $$('alert > div');

const getCloseButton = (tabNumber: number) => {
  return `alert-demo alert:nth-child(${tabNumber}) .close`;
};

async function countGetAlertCount(): Promise<number> {
  return await getAlertCount.count();
}

describe('Alerts page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/alerts');
    // Not sure, that we actually need browser.ignoreSynchronization = true; so comment it for now
    // browser.ignoreSynchronization = true;
  });

  afterAll(() => {
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });

  it('Default warnings count', () => {
    expect(countGetAlertCount).toBe(3);
  });

  it('Adding warnings', () => {
    buttonAddAlert.click();
    buttonAddAlert.click();

    expect(countGetAlertCount).toBe(5);
  });

  using(DataProvider.alertTableContains, (data: any, description: string) => {
    it(`Check tab texts: ${description}`, async () => {
      const expectedRes = data.actualResult;
      const actualRes = await data.element().getText();

      expect(actualRes).toContain(expectedRes);
    });
  });

  it('Warning alert is disappear', async () => {
    browser.sleep(3000);
    const actualRes = await alertWarning.isPresent();

    expect(actualRes).toBeFalsy();
  });

  it('User can delete danger and success alerts', () => {
    $(getCloseButton(3)).click();
    $(getCloseButton(2)).click();
    $(getCloseButton(1)).click();

    expect(countGetAlertCount).toBe(1);
  });

  it('User can delete added alerts', () => {
    buttonAddAlert.click();
    $(getCloseButton(1)).click();

    expect(countGetAlertCount).toBe(1);
  });
});
