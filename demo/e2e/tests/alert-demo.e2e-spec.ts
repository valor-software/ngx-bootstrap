import { $, $$, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';

const buttonAddAlert = $('alert-demo .btn');
const alertWarning = $('.alert.alert-warning');
const getAlertCount = $$('alert > div');
const getCloseButton = (tabNumber:any) => {
  return 'alert-demo alert:nth-child(' + tabNumber + ') .close';
};

describe('Alerts page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/alerts');
    browser.ignoreSynchronization = true;
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Warning alert is displayed', () => {
    expect(alertWarning.isDisplayed()).toBe(true);
  });
  it('Warning alert is disappear', () => {
    browser.sleep(5000);
    expect(alertWarning.isPresent()).toBe(false);
  });
  it('Default warnings count', () => {
    expect(getAlertCount.count()).toBe(3);
  });
  it('Adding warnings', () => {
    buttonAddAlert.click();
    buttonAddAlert.click();
    expect(getAlertCount.count()).toBe(5);
  });
  it('User can delete danger and success alerts', () => {
    $(getCloseButton(2)).click();
    $(getCloseButton(1)).click();
    expect(getAlertCount.count()).toBe(1);
  });
  it('User can delete added alerts', () => {
    buttonAddAlert.click();
    $(getCloseButton(3)).click();
    expect(getAlertCount.count()).toBe(3);
  });
});
describe('Alerts page test on bootstrap 4', () => {
  beforeAll(() => {
    browser.get('index-bs4.html#/alerts');
    browser.ignoreSynchronization = true;
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Warning alert is displayed', () => {
    expect(alertWarning.isDisplayed()).toBe(true);
  });
  it('Warning alert is disappear', () => {
    browser.sleep(5000);
    expect(alertWarning.isPresent()).toBe(false);
  });
  it('Default warnings count', () => {
    expect(getAlertCount.count()).toBe(3);
  });
  it('Adding warnings', () => {
    buttonAddAlert.click();
    buttonAddAlert.click();
    expect(getAlertCount.count()).toBe(5);
  });
  it('User can delete danger and success alerts', () => {
    $(getCloseButton(1)).click();
    $(getCloseButton(1)).click();
    expect(getAlertCount.count()).toBe(1);
  });
  it('User can delete added alerts', () => {
    buttonAddAlert.click();
    $(getCloseButton(3)).click();
    expect(getAlertCount.count()).toBe(3);
  });
});
