import { $, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';

const buttonToggle = $('.btn');
const sameContent = $('.well');

describe('Collapse page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/collapse');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  it('Default states', () => {
    expect(sameContent.isDisplayed()).toBe(true);
    expect(sameContent.getText()).toBe('Some content');
  });
  it('Toggle collapse is ON/OFF', () => {
    buttonToggle.click();
    expect(sameContent.isDisplayed()).toBe(false);
    buttonToggle.click();
    expect(sameContent.isDisplayed()).toBe(true);
  });
});
