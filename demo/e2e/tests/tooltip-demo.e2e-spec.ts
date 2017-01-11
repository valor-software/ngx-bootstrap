import { $, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';
import WebElement = webdriver.WebElement;

let using = require('jasmine-data-provider');
const buttonShowTooltip = $('.btn.btn-primary');
const buttonHideTooltip = $('.btn.btn-danger');
const tooltipElement = $('.tooltip-inner');
const tooltipDelayed = $('[tooltip="appears with delay"]');
const tooltipHTML = $('.item>tooltip-demo>p:nth-child(4)>a');
const tooltipTemplateRef = $('tooltip-demo>p:nth-child(5)>a');
const tooltipDynamic = $('tooltip-demo>p:nth-child(3)>a:nth-child(1)');
const inputDynamicTooltipText = $('tooltip-demo>div:nth-child(1) input');
const inputDynamicPopupText = $('tooltip-demo>div:nth-child(2) input');
const inputDisableTooltipConditionally = $('[tooltiptrigger="mouseenter"]');

describe('Tooltip page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/tooltip');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  using (DataProvider.tooltipDefaultContains, (data:any, description:string) => {
    it ('Check default texts on the page: ' + description, () => {
      expect(data.element().getText()).toBe(data.actualResult);
    });
  });
  using (DataProvider.tooltipElementsTexts, (data:any, description:string) => {
    it ('Check tooltip texts: ' + description, () => {
      browser.actions()
        .mouseMove(data.element())
        .perform();
      browser.sleep(50);
      expect(tooltipElement.getText()).toBe(data.actualResult);
    });
  });
  it ('Check buttons Show/Hide tooltip', () => {
    buttonShowTooltip.click();
    expect(tooltipElement.isDisplayed()).toBe(true);
    buttonHideTooltip.click();
    expect(tooltipElement.isPresent()).toBe(false);
  });
  it ('Check Delayed tooltip', () => {
    browser.ignoreSynchronization=true;
    browser.actions()
      .mouseMove(tooltipDelayed as any)
      .perform();
    expect(tooltipElement.isPresent()).toBe(false);
    browser.sleep(1010);
    expect(tooltipElement.getText()).toBe('appears with delay');
  });
  it ('Check HTML tooltip', () => {
    browser.ignoreSynchronization=true;
    browser.actions()
      .mouseMove(tooltipHTML as any)
      .perform();
    expect(tooltipElement.isPresent()).toBe(false);
    browser.sleep(510);
    expect(tooltipElement.getText()).toBe(`I've been made bold!`);
  });
  using (DataProvider.inputDifferentData, (data:any, description:string) => {
    it ('Check tooltip texts: ' + description, () => {
      inputDynamicPopupText.clear();
      inputDynamicPopupText.sendKeys(data.inputText);
      browser.actions()
        .mouseMove(tooltipDynamic as any)
        .perform();
      expect(tooltipElement.getText()).toBe(data.inputText);
      browser.actions()
        .mouseMove(inputDynamicTooltipText as any)
        .perform();
    });
  });
  using (DataProvider.inputDifferentData, (data:any, description:string) => {
    it ('Check tooltip texts: ' + description, () => {
      inputDynamicTooltipText.clear();
      inputDynamicTooltipText.sendKeys(data.inputText);
      expect(tooltipDynamic.getText()).toBe(data.inputText);
    });
  });
  it ('Disable tooltip conditionally. Expect to fail', () => {
    inputDisableTooltipConditionally.sendKeys('Some text');
    expect(tooltipElement.isPresent()).toBe(false);
    inputDisableTooltipConditionally.clear();
    expect(tooltipElement.isPresent()).toBe(true);
  });
  it ('Check text in tooltip TemplateRef', () => {
    browser.actions()
      .mouseMove(tooltipTemplateRef as any)
      .perform();
    expect($('.tooltip-inner>h4').getText()).toBe('Tool tip custom content defined inside a template');
    expect($('.tooltip-inner>h5').getText()).toBe('With context binding: foo');
  });
});
