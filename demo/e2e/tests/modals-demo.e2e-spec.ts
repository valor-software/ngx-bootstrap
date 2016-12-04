import { $, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

const buttonLargeModal = $('.btn:nth-child(1)');
const buttonSmallModal = $('.btn:nth-child(3)');
const buttonChildModal = $('.btn:nth-child(5)');
const buttonStaticModal = $('.btn:nth-child(7)');
const modalWindow = $('.modal.fade.in');
const modalTitle = $('.modal.fade.in .modal-title');
const modalBody = $('.modal.fade.in .modal-body');
const modalCloseButton = $('.modal.fade.in .close');
let using = require('jasmine-data-provider');

describe('Modals page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/modals');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  using (DataProvider.modalsTableContains, (data:any, description:string) => {
    it ('Check table texts: ' + description, () => {
      expect(data.element().getText()).toBe(data.actualResult);
    });
  });
  it('Large modal open and close by missclick', () => {
    buttonLargeModal.click();
    expect(modalTitle.getText()).toBe('Large modal');
    expect(modalBody.getText()).toBe('...');
    browser.actions()
      .mouseMove({ x: 1000, y: 0 })
      .click()
      .perform();
    expect(modalWindow.isPresent()).toBe(false);
  });
  it('Small modal open and close by x-cross', () => {
    buttonSmallModal.click();
    expect(modalTitle.getText()).toBe('Small modal');
    expect(modalBody.getText()).toBe('...');
    modalCloseButton.click();
    expect(modalWindow.isPresent()).toBe(false);
  });
  it('Open child modal click', () => {
    buttonChildModal.click();
    expect(modalTitle.getText()).toBe('Child modal');
    expect(modalBody.getText()).toBe('I am a child modal, opened from parent component!');
    modalCloseButton.click();
    expect(modalWindow.isPresent()).toBe(false);
  });
  it('Static modal click', () => {
    buttonStaticModal.click();
    expect(modalTitle.getText()).toBe('Static modal');
    expect(modalBody.getText()).toBe('This is static modal, backdrop click will not close it. Click × to close modal.');
  });
  it('Static modal does not close by misclick', () => {
    browser.actions()
      .mouseMove({ x: 0, y: 0 })
      .click()
      .perform();
    expect(modalWindow.isDisplayed()).toBe(true);
  });
  it('Static modal close by cross', () => {
    modalCloseButton.click();
    expect(modalWindow.isPresent()).toBe(false);
  });
});
