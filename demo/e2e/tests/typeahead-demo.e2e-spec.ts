import { $, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

let using = require('jasmine-data-provider');

const inputStatic = $('.container-fluid>input:nth-of-type(1)');
const inputCustom = $('.container-fluid>input:nth-of-type(2)');
const inputAsynchronous = $('.container-fluid>input:nth-of-type(3)');
const inputTypeahead = $('.container-fluid>form>input');
const inputGrouped = $('.container-fluid>input:nth-of-type(4)');
const modalStatic = $('.container-fluid>pre:nth-of-type(1)');
const modalCustom = $('.container-fluid>pre:nth-of-type(2)');
const modalAsynchronous = $('.container-fluid>pre:nth-of-type(3)');
const modalTypeahead = $('.container-fluid>pre:nth-of-type(4)');
const modalGrouped = $('.container-fluid>pre:nth-of-type(5)');

function getItemNumberInDropdown (itemNumber:any):any {
  return $('typeahead-container li:nth-child('+ itemNumber + ')');
}
function clearInputFields():any {
  inputStatic.clear();
  inputCustom.clear();
  inputAsynchronous.clear();
  inputTypeahead.clear();
  inputGrouped.clear();
}

describe('Typeahead page tests on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/typeahead');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  using (DataProvider.typeaheadDefaultTexts, (data:any, description:string) => {
    it ('Check default texts: ' + description, () => {
      expect(data.element().getText()).toBe(data.actualResult);
    });
  });
  using (DataProvider.inputDifferentData, (data:any, description:string) => {
    it ('Check input fields with different data: ' + description, () => {
      clearInputFields();
      inputStatic.sendKeys(data.inputText);
      expect(modalStatic.getText()).toBe('Model: ' + '"' + data.inputText + '"');
      inputCustom.sendKeys(data.inputText);
      expect(modalCustom.getText()).toBe('Model: ' + '"' + data.inputText + '"');
      inputAsynchronous.sendKeys(data.inputText);
      expect(modalAsynchronous.getText()).toBe('Model: ' + '"' + data.inputText + '"');
      inputTypeahead.sendKeys(data.inputText);
      expect(modalTypeahead.getText()).toBe('Model: ' + '"' + data.inputText + '"');
      inputGrouped.sendKeys(data.inputText);
      expect(modalGrouped.getText()).toBe('Model: ' + '"' + data.inputText + '"');
    });
  });
  using (DataProvider.typeaheadInputCityTexts, (data:any, description:string) => {
    it ('Check items from dropdown: ' + description, () => {
      clearInputFields();
      inputStatic.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      expect(modalStatic.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');
      inputCustom.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      expect(modalCustom.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');
      inputAsynchronous.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      expect(modalAsynchronous.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');
      inputTypeahead.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      expect(modalTypeahead.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');
    });
  });
  it ('Check items in Grouped results', () => {
    inputGrouped.clear();
    inputGrouped.sendKeys('a');
    $('.dropdown-menu>li:nth-child(2)').click();
    expect(modalGrouped.getText()).toContain('Alabama');
  });
  it ('Check unfounded iten in Asynchronous results ', () => {
    inputAsynchronous.clear();
    inputAsynchronous.sendKeys('123');
    expect($('.container-fluid>div').getText()).toContain('No Results Found');
  });
  it ('Check dropdown list for typehead with empty value ', () => {
    inputTypeahead.click();
    expect($('.dropdown-menu').isDisplayed()).toBe(true);
    getItemNumberInDropdown(5).click();
    expect(modalTypeahead.getText()).toContain('California');
  });
});
