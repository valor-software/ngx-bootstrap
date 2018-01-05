import { $, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

const using = require('jasmine-data-provider');

const buttonSingleToggle = $('buttons-demo>.btn');
const panelSingleToggle = $('buttons-demo>.card:nth-child(2)');
const checkboxModelFieldOne = $('buttons-demo > :nth-child(5)');
const checkboxModelFieldTwo = $('buttons-demo > :nth-child(6)');
const radioField = $('buttons-demo > :nth-child(9)');

function pressCheckboxButton(buttonPosition: number): string {
  return `.btn-group [btncheckbox]:nth-child(${buttonPosition})`;
}

function radioButton(buttonPosition: number): string {
  return `.btn-group:nth-child(2n) :nth-child(${buttonPosition})`;
}

function unckeckableRadioButton(buttonPosition: number): string {
  return `.btn-group [uncheckable]:nth-child(${buttonPosition})`;
}

async function getClassRadioButton(btnPos: number): Promise<string> {
  return await $(radioButton(btnPos)).getAttribute('class');
}

async function getClassUncheckableRadioBTn(btnPos: number): Promise<string> {
  return await $(unckeckableRadioButton(btnPos)).getAttribute('class');
}

describe('Buttons page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/buttons');
    // Not sure, that we actually need browser.ignoreSynchronization = true; so comment it for now
    // browser.ignoreSynchronization = true;
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });

  using(DataProvider.buttonsTableContains, (data: any, description: string) => {
    it(`Check table texts: ${description}`, async () => {
      const expectedRes = data.actualResult;
      const actualRes = await data.element().getText();

      expect(actualRes).toBe(expectedRes);
    });
  });

  it('Check single toggle button', async () => {
    const actualClassButton = await buttonSingleToggle.getAttribute('class');
    const actualPanelText = await panelSingleToggle.getText();
    let expectedClassValue: string;

    expectedClassValue = 'btn btn-primary ng-untouched ng-pristine ng-valid active';
    expect(actualClassButton).toBe(expectedClassValue);

    expectedClassValue = 'btn btn-primary ng-untouched ng-pristine ng-valid';
    buttonSingleToggle.click();
    expect(actualPanelText).toBe('0');
    expect(actualClassButton).toContain(expectedClassValue);

    expectedClassValue = 'btn btn-primary ng-untouched ng-pristine ng-valid active';
    buttonSingleToggle.click();
    expect(actualPanelText).toBe('1');
    expect(actualClassButton).toContain(expectedClassValue);
  });

  it('Checkbox. Defaults states for checkbox buttons', async () => {
    const checkboxFieldOneText = await checkboxModelFieldOne.getText();
    const checkboxFieldTwoText = await checkboxModelFieldTwo.getText();
    const expClassFirstThirdBtn = 'btn btn-primary ng-untouched ng-pristine ng-valid';
    const firstBtnClass = await $(pressCheckboxButton(1)).getAttribute('class');
    const secondBtnClass = await $(pressCheckboxButton(2)).getAttribute('class');
    const thirdBtnClass = await $(pressCheckboxButton(3)).getAttribute('class');

    expect(checkboxFieldOneText).toContain('"left": false');
    expect(checkboxFieldOneText).toContain('"middle": true');
    expect(checkboxFieldOneText).toContain('"right": false');
    expect(checkboxFieldTwoText).toContain('Left: false');
    expect(checkboxFieldTwoText).toContain('Middle: true');
    expect(checkboxFieldTwoText).toContain('Right: false');

    expect(firstBtnClass).toBe(expClassFirstThirdBtn);
    expect(secondBtnClass).toContain('active');
    expect(thirdBtnClass).toBe(expClassFirstThirdBtn);
  });

  it('Checkbox. Change state for left and Right buttons', async () => {
    const secondBtnClass = await $(pressCheckboxButton(2)).getAttribute('class');
    const expSecondClassTempl = 'btn btn-primary ng-untouched ng-pristine ng-valid';

    $(pressCheckboxButton(1)).click();
    $(pressCheckboxButton(2)).click();
    $(pressCheckboxButton(3)).click();

    expect(checkboxModelFieldOne.getText()).toContain('"left": true');
    expect(checkboxModelFieldOne.getText()).toContain('"middle": false');
    expect(checkboxModelFieldOne.getText()).toContain('"right": true');
    expect(checkboxModelFieldTwo.getText()).toContain('Left: true');
    expect(checkboxModelFieldTwo.getText()).toContain('Middle: false');
    expect(checkboxModelFieldTwo.getText()).toContain('Right: true');
    expect($(pressCheckboxButton(1)).getAttribute('class')).toContain('active');
    expect(secondBtnClass).toBe(expSecondClassTempl);
    expect($(pressCheckboxButton(3)).getAttribute('class')).toContain('active');
  });

  it('Radio. Check defaults states for radio buttons', async () => {
    expect(radioField.getText()).toContain('Middle');
    expect(await getClassRadioButton(1)).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect(await getClassRadioButton(2)).toContain('active');
    expect(await getClassRadioButton(3)).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect(await getClassUncheckableRadioBTn(1)).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect(await getClassUncheckableRadioBTn(2)).toContain('active');
    expect(await getClassUncheckableRadioBTn(3)).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
  });

  it('Radio. Check left position for radio buttons', async () => {
    $(radioButton(1)).click();

    expect(radioField.getText()).toContain('Left');
    expect(await getClassRadioButton(1)).toContain('active');
    expect(await getClassRadioButton(2)).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect(await getClassRadioButton(3)).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect(await getClassUncheckableRadioBTn(1)).toContain('active');
    expect(await getClassUncheckableRadioBTn(2)).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect(await getClassUncheckableRadioBTn(3)).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
  });

  it('Radio. Check right position for radio buttons', async () => {
    $(unckeckableRadioButton(3)).click();

    expect(radioField.getText()).toContain('Right');
    expect(await getClassRadioButton(1)).toBe('btn btn-primary ng-valid ng-touched ng-dirty');
    expect(await getClassRadioButton(2)).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect(await getClassRadioButton(3)).toContain('active');
    expect(await getClassUncheckableRadioBTn(1)).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect(await getClassUncheckableRadioBTn(2)).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect(await getClassUncheckableRadioBTn(3)).toContain('active');
  });

  it('Radio. Check null state for radio buttons', async () => {
    $(unckeckableRadioButton(3)).click();

    expect(radioField.getText()).toContain('null');
    expect(await getClassRadioButton(1)).toBe('btn btn-primary ng-valid ng-touched ng-dirty');
    expect(await getClassRadioButton(2)).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect(await getClassRadioButton(3)).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect(await getClassUncheckableRadioBTn(1)).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect(await getClassUncheckableRadioBTn(2)).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect(await getClassUncheckableRadioBTn(3)).toBe('btn btn-success ng-valid ng-touched ng-dirty');
  });
});
