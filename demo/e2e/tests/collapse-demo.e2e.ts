import { $, browser } from 'protractor/globals';

const leftPanelTests = require('./../data/leftPanelTests.e2e');
const buttonToggle = $('.btn');
const sameContent = $('.well');

describe('Collapse page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/collapse');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Default states', () => {
    expect(sameContent.isDisplayed()).toBe(true);
    expect(sameContent.getText()).toBe('Some content');
  });
  it('Toggle collapse is ON', () => {
    buttonToggle.click();
    expect(sameContent.isDisplayed()).toBe(false);
  });
  it('Toggle collapse is OFF', () => {
    buttonToggle.click();
    buttonToggle.click();
    expect(sameContent.isDisplayed()).toBe(true);
    expect(sameContent.getText()).toBe('Some content');
  });
});

describe('Collapse page test on bootstrap 4', () => {
  beforeAll(() => {
    browser.get('index-bs4.html#/collapse');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Default states', () => {
    expect(sameContent.isDisplayed()).toBe(true);
    expect(sameContent.getText()).toBe('Some content');
  });
  it('Toggle collapse is ON', () => {
    buttonToggle.click();
    expect(sameContent.isDisplayed()).toBe(false);
  });
  it('Toggle collapse is OFF', () => {
    buttonToggle.click();
    buttonToggle.click();
    expect(sameContent.isDisplayed()).toBe(true);
    expect(sameContent.getText()).toBe('Some content');
  });
});
