import { $, $$, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

let using = require('jasmine-data-provider');
const buttonAddAlert = $('alert-demo .btn');
const alertWarning = $('[ng-reflect-ng-class="alert-warning"]');
const getAlertCount = $$('alert > div');

const getCloseButton = (tabNumber:number) => {
  return 'alert-demo alert:nth-child(' + tabNumber + ') .close';
};

describe('Alerts page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/alerts');
    browser.ignoreSynchronization = true;
  });
  afterAll(() => {
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  it('Default warnings count', () => {
    expect(getAlertCount.count()).toBe(3);
  });
  it('Adding warnings', () => {
    buttonAddAlert.click();
    buttonAddAlert.click();
    expect(getAlertCount.count()).toBe(5);
  });
  using (DataProvider.alertTableContains, (data:any, description:string) => {
    it ('Check tab texts: ' + description, () => {
      expect(data.element().getText()).toContain(data.actualResult);
    });
  });
  it('Warning alert is disappear', () => {
    browser.sleep(3000);
    expect(alertWarning.isPresent()).toBe(false);
  });
  it('User can delete danger and success alerts', () => {
    $(getCloseButton(3)).click();
    $(getCloseButton(2)).click();
    $(getCloseButton(1)).click();
    expect(getAlertCount.count()).toBe(1);
  });
  it('User can delete added alerts', () => {
    buttonAddAlert.click();
    $(getCloseButton(1)).click();
    expect(getAlertCount.count()).toBe(1);
  });
});
