import { $, $$, browser, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

const using = require('jasmine-data-provider');

const buttonToggleLastPanel = $('accordion-demo>p button:nth-child(1)');
const buttonEnableDisablePanel = $('accordion-demo>p button:nth-child(2)');
const buttonAddItem = $('.panel-body .btn');
const checkboxOnlyOne = $('.checkbox .ng-valid');
const getItemsCount = $$('accordion-group:nth-child(4) .panel-body > div');
const buttonArrow = $('.pull-right');

function getTabHeader(tabNumber: number): ElementFinder {
  return $(`accordion-group:nth-child(${tabNumber}) .panel-heading`);
}

function getTabContent(tabNumber: number): ElementFinder {
  return $(`accordion-group:nth-child(${tabNumber}) .panel-body`);
}

async function tabContentIsDisplayed(tabNum: number): Promise<boolean> {
  return await getTabContent(tabNum).isDisplayed();
}

async function tabHeaderIsDisplayed(tabNum: number): Promise<boolean> {
  return await getTabHeader(tabNum).isDisplayed();
}

async function getNumberOfItems(): Promise<number> {
  return await getItemsCount.count();
}

describe('Check the Accordion page in bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/accordion');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });

  it('Close/open first tab by click', async () => {
    getTabHeader(1).click();
    expect(await tabContentIsDisplayed(1)).toBeFalsy();

    getTabHeader(1).click();
    expect(await tabContentIsDisplayed(1)).toBeTruthy();
  });

  it('Open/close last tab with button Toggle Last Panel', async () => {
    buttonToggleLastPanel.click();
    expect(await tabContentIsDisplayed(5)).toBeTruthy();
    expect(buttonArrow.getAttribute('class')).toContain('glyphicon-chevron-down');

    buttonToggleLastPanel.click();
    expect(await tabContentIsDisplayed(5)).toBeFalsy();
    expect(buttonArrow.getAttribute('class')).toContain('glyphicon-chevron-right');
  });

  it('Button Enable/Disable first panel is ON', async () => {
    buttonEnableDisablePanel.click();
    getTabHeader(1).click();

    expect(await tabContentIsDisplayed(1)).toBeFalsy();
  });

  it('Button Enable/Disable first panel is OFF', async () => {
    buttonEnableDisablePanel.click();
    getTabHeader(1).click();

    expect(await tabHeaderIsDisplayed(1)).toBeTruthy();
  });

  it('Add items in 4th tab', () => {
    getTabHeader(4).click();
    expect(getNumberOfItems).toBe(3);

    buttonAddItem.click();
    buttonAddItem.click();
    expect(getNumberOfItems).toBe(5);

    getTabHeader(4).click();
  });

  it('Open all tabs together', () => {
    checkboxOnlyOne.click();
    getTabHeader(1).click();
    browser.wait(EC.visibilityOf(getTabContent(1)), 500);

    getTabHeader(2).click();
    browser.wait(EC.visibilityOf(getTabContent(2)), 500);

    getTabHeader(3).click();
    browser.wait(EC.visibilityOf(getTabContent(3)), 500);

    getTabHeader(4).click();
    browser.wait(EC.visibilityOf(getTabContent(4)), 500);

    getTabHeader(5).click();
  });

  using(DataProvider.accordionTableContent, (data: any, description: string) => {
    it(`Check table texts: ${description}`, () => {
      expect(data.element().getText()).toBe(data.actualResult);
    });
  });
});
