import { $, $$, browser } from 'protractor/globals';
import { describe } from './../../typings/globals/require/index';

const leftPanelTests = require('./../data/leftPanelTests.e2e');
const buttonToggleLastPanel = $('accordion-demo>p button:nth-child(1)');
const buttonEnableDisablePanel = $('accordion-demo>p button:nth-child(2)');
const buttonAddItem = $('.panel-body .btn');
const checkboxOnlyOne = $('.checkbox .ng-valid');
const getItemsCount = $$('accordion-group:nth-child(4) .panel-body > div');

const setTabHeaderNumber = (tabNumber:any) => {
  return 'accordion-group:nth-child(' + tabNumber + ') .panel-heading';
};
const setTabContentNumber = (tabNumber:any) => {
  return 'accordion-group:nth-child(' + tabNumber + ') .panel-body';
};

describe('Check the Accordion page in bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/accordion');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  afterEach(() => {
    browser.refresh();
  });
  it('Opening last tab with button Toggle Last Panel', () => {
    buttonToggleLastPanel.click();
    expect($(setTabContentNumber(5)).isDisplayed()).toBe(true);
  });
  it('Closing last tab with button Toggle Last Panel', () => {
    buttonToggleLastPanel.click();
    buttonToggleLastPanel.click();
    expect($(setTabContentNumber(5)).isDisplayed()).toBe(false);
  });
  it('Closing first tab by clicking', () => {
    $(setTabHeaderNumber(1)).click();
    expect($(setTabContentNumber(1)).isDisplayed()).toBe(false);
  });
  it('Opening first tab by clicking', () => {
    $(setTabHeaderNumber(1)).click();
    $(setTabHeaderNumber(1)).click();
    expect($(setTabContentNumber(1)).isDisplayed()).toBe(true);
  });
  it('Button Enable/Disable first panel', () => {
    buttonEnableDisablePanel.click();
    $(setTabHeaderNumber(1)).click();
    expect($(setTabHeaderNumber(1)).isDisplayed()).toBe(true);
  });
  it('Default items in 4th tab', () => {
    $(setTabHeaderNumber(4)).click();
    expect(getItemsCount.count()).toBe(3);
  });
  it('Button Add Item in 4th tab', () => {
    $(setTabHeaderNumber(4)).click();
    buttonAddItem.click();
    buttonAddItem.click();
    expect(getItemsCount.count()).toBe(5);
  });
  it('Open 2 tabs together', () => {
    checkboxOnlyOne.click();
    $(setTabHeaderNumber(2)).click();
    $(setTabHeaderNumber(3)).click();
    expect($(setTabHeaderNumber(2)).isDisplayed()).toBe(true);
    expect($(setTabHeaderNumber(3)).isDisplayed()).toBe(true);
  });
});
describe('Check the Accordion page in bootstrap 4', () => {
  beforeAll(() => {
    browser.get('index-bs4.html#/accordion');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Opening last tab with button Toggle Last Panel', () => {
    buttonToggleLastPanel.click();
    expect($(setTabContentNumber(5)).isDisplayed()).toBe(true);
  });
  it('Closing last tab with button Toggle Last Panel', () => {
    buttonToggleLastPanel.click();
    buttonToggleLastPanel.click();
    expect($(setTabContentNumber(5)).isDisplayed()).toBe(false);
  });
  it('Closing first tab by clicking', () => {
    $(setTabHeaderNumber(1)).click();
    expect($(setTabContentNumber(1)).isDisplayed()).toBe(false);
  });
  it('Opening first tab by clicking', () => {
    $(setTabHeaderNumber(1)).click();
    $(setTabHeaderNumber(1)).click();
    expect($(setTabContentNumber(1)).isDisplayed()).toBe(true);
  });
  it('Button Enable/Disable first panel', () => {
    buttonEnableDisablePanel.click();
    $(setTabHeaderNumber(1)).click();
    expect($(setTabHeaderNumber(1)).isDisplayed()).toBe(true);
  });
  it('Default items in 4th tab', () => {
    $(setTabHeaderNumber(4)).click();
    expect(getItemsCount.count()).toBe(3);
  });
  it('Button Add Item in 4th tab', () => {
    $(setTabHeaderNumber(4)).click();
    buttonAddItem.click();
    buttonAddItem.click();
    expect(getItemsCount.count()).toBe(5);
  });
  it('Open 2 tabs together', () => {
    checkboxOnlyOne.click();
    $(setTabHeaderNumber(2)).click();
    $(setTabHeaderNumber(3)).click();
    expect($(setTabHeaderNumber(2)).isDisplayed()).toBe(true);
    expect($(setTabHeaderNumber(3)).isDisplayed()).toBe(true);
  });
});
