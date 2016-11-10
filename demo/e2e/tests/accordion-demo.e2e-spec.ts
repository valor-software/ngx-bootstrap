import { $, $$, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

const buttonToggleLastPanel = $('accordion-demo>p button:nth-child(1)');
const buttonEnableDisablePanel = $('accordion-demo>p button:nth-child(2)');
const buttonAddItem = $('.panel-body .btn');
const checkboxOnlyOne = $('.checkbox .ng-valid');
const getItemsCount = $$('accordion-group:nth-child(4) .panel-body > div');
const buttonArrow = $('.pull-right');
let using = require('jasmine-data-provider');

const getTabHeader = (tabNumber:number) => {
  return $('accordion-group:nth-child(' + tabNumber + ') .panel-heading');
};
const getTabContent = (tabNumber:number) => {
  return $('accordion-group:nth-child(' + tabNumber + ') .panel-body');
};

describe('Check the Accordion page in bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/accordion');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  it('Close/open first tab by click', () => {
    getTabHeader(1).click();
    expect(getTabContent(1).isDisplayed()).toBe(false);
    getTabHeader(1).click();
    expect(getTabContent(1).isDisplayed()).toBe(true);
  });
  it('Open/close last tab with button Toggle Last Panel', () => {
    buttonToggleLastPanel.click();
    expect(getTabContent(5).isDisplayed()).toBe(true);
    expect(buttonArrow.getAttribute('class')).toContain('glyphicon-chevron-down');
    buttonToggleLastPanel.click();
    expect(getTabContent(5).isDisplayed()).toBe(false);
    expect(buttonArrow.getAttribute('class')).toContain('glyphicon-chevron-right');
  });
  it('Button Enable/Disable first panel is ON', () => {
    buttonEnableDisablePanel.click();
    getTabHeader(1).click();
    expect(getTabContent(1).isDisplayed()).toBe(false);
  });
  it('Button Enable/Disable first panel is OFF', () => {
    buttonEnableDisablePanel.click();
    getTabHeader(1).click();
    expect(getTabHeader(1).isDisplayed()).toBe(true);
  });
  it('Add items in 4th tab', () => {
    getTabHeader(4).click();
    expect(getItemsCount.count()).toBe(3);
    buttonAddItem.click();
    buttonAddItem.click();
    expect(getItemsCount.count()).toBe(5);
  });
  it('Open all tabs together', () => {
      checkboxOnlyOne.click();
      getTabHeader(1).click();
      getTabHeader(2).click();
      getTabHeader(3).click();
      getTabHeader(5).click();
      expect(getTabHeader(1).isDisplayed()).toBe(true);
      expect(getTabHeader(2).isDisplayed()).toBe(true);
      expect(getTabHeader(3).isDisplayed()).toBe(true);
      expect(getTabHeader(4).isDisplayed()).toBe(true);
      expect(getTabHeader(5).isDisplayed()).toBe(true);
  });
  using (DataProvider.accordionTableContent, (data:any, description:string) => {
    it ('Check table texts: ' + description, () => {
      expect(data.element().getText()).toBe(data.actualResult);
    });
  });
});
describe('Check the Accordion page in bootstrap 4', () => {
  beforeAll(() => {
    browser.get('index-bs4.html#/accordion');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  it('Close/open first tab by click', () => {
    getTabHeader(1).click();
    expect(getTabContent(1).isDisplayed()).toBe(false);
    getTabHeader(1).click();
    expect(getTabContent(1).isDisplayed()).toBe(true);
  });
  it('Open/close last tab with button Toggle Last Panel', () => {
    buttonToggleLastPanel.click();
    expect(getTabContent(5).isDisplayed()).toBe(true);
    expect(buttonArrow.getAttribute('class')).toContain('glyphicon-chevron-down');
    buttonToggleLastPanel.click();
    expect(getTabContent(5).isDisplayed()).toBe(false);
    expect(buttonArrow.getAttribute('class')).toContain('glyphicon-chevron-right');
  });
  it('Button Enable/Disable first panel is ON', () => {
    buttonEnableDisablePanel.click();
    getTabHeader(1).click();
    expect(getTabContent(1).isDisplayed()).toBe(false);
  });
  it('Button Enable/Disable first panel is OFF', () => {
    buttonEnableDisablePanel.click();
    getTabHeader(1).click();
    expect(getTabHeader(1).isDisplayed()).toBe(true);
  });
  it('Add items in 4th tab', () => {
    getTabHeader(4).click();
    expect(getItemsCount.count()).toBe(3);
    buttonAddItem.click();
    buttonAddItem.click();
    expect(getItemsCount.count()).toBe(5);
  });
  it('Open all tabs together', () => {
    checkboxOnlyOne.click();
    getTabHeader(1).click();
    getTabHeader(2).click();
    getTabHeader(3).click();
    getTabHeader(5).click();
    expect(getTabHeader(1).isDisplayed()).toBe(true);
    expect(getTabHeader(2).isDisplayed()).toBe(true);
    expect(getTabHeader(3).isDisplayed()).toBe(true);
    expect(getTabHeader(4).isDisplayed()).toBe(true);
    expect(getTabHeader(5).isDisplayed()).toBe(true);
  });
  using (DataProvider.accordionTableContent, (data:any, description:string) => {
    it ('Check table texts: ' + description, () => {
      expect(data.element().getText()).toBe(data.actualResult);
    });
  });
});
