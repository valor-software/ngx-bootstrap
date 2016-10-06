import { $, browser } from 'protractor/globals';

const leftPanelTests = require('./../data/leftPanelTests.e2e');
const buttonSingleToggle = $('buttons-demo>.btn');
const panelSingleToggle = $('buttons-demo>.card:nth-child(2)');
// cant find better CSS
const checkboxModelFieldOne = $('buttons-demo > :nth-child(5)');
const checkboxModelFieldTwo = $('buttons-demo > :nth-child(6)');
const radioField = $('buttons-demo > :nth-child(9)');
const pressCheckboxButton = (buttonPosition:any) => {
  return '.btn-group [btncheckbox]:nth-child(' + buttonPosition + ')';
};
const radioButton = (buttonPosition:any) => {
  return 'buttons-demo > div:nth-child(2n) :nth-child(' + buttonPosition + ')';
};
const unckeckableRadioButton = (buttonPosition:any) => {
  return '.btn-group [uncheckable]:nth-child(' + buttonPosition + ')';
};
describe('Buttons page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/buttons');
    browser.ignoreSynchronization = true;
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Check single toggle button', () => {
    buttonSingleToggle.click();
    expect(panelSingleToggle.getText()).toBe('0');
  });
  it('Check that only two states are presented for Single toggle button', () => {
    buttonSingleToggle.click();
    buttonSingleToggle.click();
    expect(panelSingleToggle.getText()).toBe('1');
  });
  it('Checkbox. Defaults states for checkbox buttons', () => {
    expect(checkboxModelFieldOne.getText()).toContain('"left": false');
    expect(checkboxModelFieldOne.getText()).toContain('"middle": true');
    expect(checkboxModelFieldOne.getText()).toContain('"right": false');
    expect(checkboxModelFieldTwo.getText()).toContain('Left: false');
    expect(checkboxModelFieldTwo.getText()).toContain('Middle: true');
    expect(checkboxModelFieldTwo.getText()).toContain('Right: false');
    expect($(pressCheckboxButton(1)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(pressCheckboxButton(2)).getAttribute('class')).toContain('active');
    expect($(pressCheckboxButton(3)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
  });
  it('Checkbox. Change state for left and Right buttons', () => {
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
    expect($(pressCheckboxButton(2)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(pressCheckboxButton(3)).getAttribute('class')).toContain('active');
  });
  it('Radio. Check defaults states for radio buttons', () => {
    expect(radioField.getText()).toContain('Middle');
    expect($(radioButton(1)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(2)).getAttribute('class')).toContain('active');
    expect($(radioButton(3)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(1)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(2)).getAttribute('class')).toContain('active');
    expect($(unckeckableRadioButton(3)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
  });
  it('Radio. Check left position for radio buttons', () => {
    $(radioButton(1)).click();
    expect(radioField.getText()).toContain('Left');
    expect($(radioButton(1)).getAttribute('class')).toContain('active');
    expect($(radioButton(2)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(3)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(1)).getAttribute('class')).toContain('active');
    expect($(unckeckableRadioButton(2)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(3)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
  });
  it('Radio. Check right position for radio buttons', () => {
    $(unckeckableRadioButton(3)).click();
    expect(radioField.getText()).toContain('Right');
    expect($(radioButton(1)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(2)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(3)).getAttribute('class')).toContain('active');
    expect($(unckeckableRadioButton(1)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(2)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(3)).getAttribute('class')).toContain('active');
  });
  it('Radio. Check null state for radio buttons', () => {
    $(unckeckableRadioButton(2)).click();
    expect(radioField.getText()).toContain('null');
    expect($(radioButton(1)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(2)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(3)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(1)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(2)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(3)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
  });
});

describe('Buttons page test on bootstrap 4', () => {
  beforeAll(() => {
    browser.get('index-bs4.html#/buttons');
    browser.ignoreSynchronization = true;
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Check single toggle button', () => {
    buttonSingleToggle.click();
    expect(panelSingleToggle.getText()).toBe('0');
  });
  it('Check that only two states are presented for Single toggle button', () => {
    buttonSingleToggle.click();
    buttonSingleToggle.click();
    expect(panelSingleToggle.getText()).toBe('1');
  });
  it('Checkbox. Defaults states for checkbox buttons', () => {
    expect(checkboxModelFieldOne.getText()).toContain('"left": false');
    expect(checkboxModelFieldOne.getText()).toContain('"middle": true');
    expect(checkboxModelFieldOne.getText()).toContain('"right": false');
    expect(checkboxModelFieldTwo.getText()).toContain('Left: false');
    expect(checkboxModelFieldTwo.getText()).toContain('Middle: true');
    expect(checkboxModelFieldTwo.getText()).toContain('Right: false');
    expect($(pressCheckboxButton(1)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(pressCheckboxButton(2)).getAttribute('class')).toContain('active');
    expect($(pressCheckboxButton(3)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
  });
  it('Checkbox. Change state for left and Right buttons', () => {
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
    expect($(pressCheckboxButton(2)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(pressCheckboxButton(3)).getAttribute('class')).toContain('active');
  });
  it('Radio. Check defaults states for radio buttons', () => {
    expect(radioField.getText()).toContain('Middle');
    expect($(radioButton(1)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(2)).getAttribute('class')).toContain('active');
    expect($(radioButton(3)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(1)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(2)).getAttribute('class')).toContain('active');
    expect($(unckeckableRadioButton(3)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
  });
  it('Radio. Check left position for radio buttons', () => {
    $(radioButton(1)).click();
    expect(radioField.getText()).toContain('Left');
    expect($(radioButton(1)).getAttribute('class')).toContain('active');
    expect($(radioButton(2)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(3)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(1)).getAttribute('class')).toContain('active');
    expect($(unckeckableRadioButton(2)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(3)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
  });
  it('Radio. Check right position for radio buttons', () => {
    $(unckeckableRadioButton(3)).click();
    expect(radioField.getText()).toContain('Right');
    expect($(radioButton(1)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(2)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(3)).getAttribute('class')).toContain('active');
    expect($(unckeckableRadioButton(1)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(2)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(3)).getAttribute('class')).toContain('active');
  });
  it('Radio. Check null state for radio buttons', () => {
    $(unckeckableRadioButton(2)).click();
    expect(radioField.getText()).toContain('null');
    expect($(radioButton(1)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(2)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(radioButton(3)).getAttribute('class')).toBe('btn btn-primary ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(1)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(2)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
    expect($(unckeckableRadioButton(3)).getAttribute('class')).toBe('btn btn-success ng-untouched ng-pristine ng-valid');
  });
});
