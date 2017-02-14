import {browser, $} from 'protractor';
import {typeheadEl} from '../selectors.json';
import {leftPanelTests} from './leftPanelTests.po';
import {DataProvider} from '../data-provider/data-provider.po';

let using = require('jasmine-data-provider');

function getItemNumberInDropdown(itemNumber: any): any {
  return $('typeahead-container li:nth-child(' + itemNumber + ')>a');
}

function clearInputFields(): any {
  typeheadEl.inputStatic.clear();
  typeheadEl.inputTemplate.clear();
  typeheadEl.inputOption.clear();
  typeheadEl.inputAsynchronous.clear();
  typeheadEl.inputReactiveForms.clear();
  typeheadEl.inputGroupingResults.clear();
}

describe('Typeahead page tests on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/typeahead');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
    browser.ignoreSynchronization = false;
  });

  using(DataProvider.typeaheadDefaultTexts, (data: any, description: string) => {
    it('Check default texts: ' + description, () => {
      expect(data.element().getText()).toContain(data.actualResult);
    });
  });

  using(DataProvider.inputDifferentData, (data: any, description: string) => {
    it('Check input fields with different data: ' + description, () => {
      clearInputFields();
      typeheadEl.inputStatic.sendKeys(data.inputText);
      expect(typeheadEl.modelStatic.getText()).toBe('Model: ' + '"' + data.inputText + '"');

      typeheadEl.inputTemplate.sendKeys(data.inputText);
      expect(typeheadEl.modelTemplate.getText()).toBe('Model: ' + '"' + data.inputText + '"');

      typeheadEl.inputOption.sendKeys(data.inputText);
      expect(typeheadEl.modelOption.getText()).toBe('Model: ' + '"' + data.inputText + '"');

      typeheadEl.inputAsynchronous.sendKeys(data.inputText);
      expect(typeheadEl.modelAsynchronous.getText()).toBe('Model: ' + '"' + data.inputText + '"');

      typeheadEl.inputReactiveForms.sendKeys(data.inputText);
      expect(typeheadEl.modelReactiveForms.getText()).toBe('Model: ' + '"' + data.inputText + '"');

      typeheadEl.inputGroupingResults.sendKeys(data.inputText);
      expect(typeheadEl.modelGroupingResults.getText()).toBe('Model: ' + '"' + data.inputText + '"');
    });
  });

  using(DataProvider.typeaheadInputCityTexts, (data: any, description: string) => {
    it('Check items from dropdown: ' + description, () => {
      clearInputFields();
      typeheadEl.inputStatic.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      expect(typeheadEl.modelStatic.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');

      typeheadEl.inputTemplate.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      expect(typeheadEl.modelTemplate.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');

      typeheadEl.inputOption.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      expect(typeheadEl.modelOption.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');

      typeheadEl.inputAsynchronous.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      expect(typeheadEl.modelAsynchronous.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');

      typeheadEl.inputReactiveForms.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      expect(typeheadEl.modelReactiveForms.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');

      typeheadEl.inputGroupingResults.sendKeys(data.inputText);
      getItemNumberInDropdown(2).click();
      expect(typeheadEl.modelGroupingResults.getText()).toBe('Model: ' + '"' + data.expectedResult + '"');
    });
  });

  it('Check items in Static array', () => {
    typeheadEl.inputStatic.clear();
    typeheadEl.inputStatic.sendKeys('a');
    typeheadEl.staticArrayAlabama.click();
    expect(typeheadEl.modelStatic.getText()).toContain('Alabama');
  });

  it('Check items in Item template', () => {
    typeheadEl.inputTemplate.clear();
    typeheadEl.inputTemplate.sendKeys('a');
    typeheadEl.staticArrayAlabama.click();
    expect(typeheadEl.modelStatic.getText()).toContain('Alabama');
  });

  it('Check items in Option field', () => {
    typeheadEl.inputOption.clear();
    typeheadEl.inputOption.sendKeys('a');
    typeheadEl.staticArrayAlabama.click();
    expect(typeheadEl.modelOption.getText()).toContain('Alabama');
  });

  it('Check unfounded item in Async data results', () => {
    typeheadEl.inputAsynchronous.clear();
    typeheadEl.inputAsynchronous.sendKeys('1');
    expect(typeheadEl.errorMessageNoResultsFound.getText()).toContain('No Results Found');
  });

  it('Check dropdown list "Reactive forms" for empty value Model: (null)', () => {
    browser.refresh();
    expect(typeheadEl.modelReactiveForms.getText()).toEqual('Model: null');
  });

  it('Check grouping option at list "Grouping results"', () => {
    typeheadEl.inputGroupingResults.sendKeys('a');
    expect(typeheadEl.dropdownHeader.isDisplayed()).toBe(true);
  });

});
