import { browser, $, ElementFinder } from 'protractor';
import { typeheadEl } from '../selectors.json';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

const using = require('jasmine-data-provider');

function getItemNumberInDropdown(itemNumber: number): ElementFinder {
  return $(`typeahead-container li:nth-child('${itemNumber}')>a`);
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
    // Not sure, that we actually need browser.ignoreSynchronization = false; so comment it for now
    // browser.ignoreSynchronization = false;
  });

  using(DataProvider.typeaheadDefaultTexts, (data: any, description: string) => {
    it(`Check default texts: ${description}`, () => {
      expect(data.element().getText()).toContain(data.actualResult);
    });
  });

  using(DataProvider.inputDifferentData, (data: any, description: string) => {
    it(`Check input fields with different data: ${description}`, async () => {
      let modelText: string;
      const expectedText = `Model: "${data.inputText}"`;

      clearInputFields();
      typeheadEl.inputStatic.sendKeys(data.inputText);
      modelText = await typeheadEl.modelStatic.getText();
      expect(modelText).toBe(expectedText);

      typeheadEl.inputTemplate.sendKeys(data.inputText);
      modelText = await typeheadEl.modelTemplate.getText();
      expect(modelText).toBe(expectedText);

      typeheadEl.inputOption.sendKeys(data.inputText);
      modelText = await typeheadEl.modelOption.getText();
      expect(modelText).toBe(expectedText);

      typeheadEl.inputAsynchronous.sendKeys(data.inputText);
      modelText = await typeheadEl.modelAsynchronous.getText();
      expect(modelText).toBe(expectedText);

      typeheadEl.inputReactiveForms.sendKeys(data.inputText);
      modelText = await typeheadEl.modelReactiveForms.getText();
      expect(modelText).toBe(expectedText);

      typeheadEl.inputGroupingResults.sendKeys(data.inputText);
      modelText = await typeheadEl.modelGroupingResults.getText();
      expect(modelText).toBe(expectedText);
    });
  });

  using(DataProvider.typeaheadInputCityTexts, (data: any, description: string) => {
    it(`Check items from dropdown: ${description}`, async () => {
      let actualModelText: string;
      const expectedModelText = `Model: "${data.expectedResult}"`;

      clearInputFields();
      typeheadEl.inputStatic.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      actualModelText = await typeheadEl.modelStatic.getText();
      expect(actualModelText).toBe(expectedModelText);

      typeheadEl.inputTemplate.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      actualModelText = await typeheadEl.modelTemplate.getText();
      expect(actualModelText).toBe(expectedModelText);

      typeheadEl.inputOption.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      actualModelText = await typeheadEl.modelOption.getText();
      expect(actualModelText).toBe(expectedModelText);

      typeheadEl.inputAsynchronous.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      actualModelText = await typeheadEl.modelAsynchronous.getText();
      expect(actualModelText).toBe(expectedModelText);

      typeheadEl.inputReactiveForms.sendKeys(data.inputText);
      getItemNumberInDropdown(1).click();
      actualModelText = await typeheadEl.modelReactiveForms.getText();
      expect(actualModelText).toBe(expectedModelText);

      typeheadEl.inputGroupingResults.sendKeys(data.inputText);
      getItemNumberInDropdown(2).click();
      actualModelText = await typeheadEl.modelGroupingResults.getText();
      expect(actualModelText).toBe(expectedModelText);
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

  it('Check dropdown list "Reactive forms" for empty value Model: (null)', async () => {
    const reactiveModelText = await typeheadEl.modelReactiveForms.getText();
    const expectedText = 'Model: null';

    browser.refresh();

    expect(reactiveModelText).toEqual(expectedText);
  });

  it('Check grouping option at list "Grouping results"', async () => {
    const dropdownHeaderIsDisplayed = await typeheadEl.dropdownHeader.isDisplayed();

    typeheadEl.inputGroupingResults.sendKeys('a');

    expect(dropdownHeaderIsDisplayed).toBeTruthy();
  });
});
