import { $, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

const using = require('jasmine-data-provider');

const buttonLargeModal = $('.btn:nth-child(1)');
const buttonSmallModal = $('.btn:nth-child(3)');
const buttonChildModal = $('.btn:nth-child(5)');
const buttonStaticModal = $('.btn:nth-child(7)');
const modalWindow = $('.modal.fade.in');
const modalTitle = $('.modal.fade.in .modal-title');
const modalBody = $('.modal.fade.in .modal-body');
const modalCloseButton = $('.modal.fade.in .close');

async function modalTitleText(): Promise<string> {
  return await modalTitle.getText();
}

async function modalBodyText(): Promise<string> {
  return await modalBody.getText();
}

async function modalIsPresent(): Promise<boolean> {
  return await modalWindow.isPresent();
}

describe('Modals page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/modals');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });

  using(DataProvider.modalsTableContains, (data: any, description: string) => {
    it(`Check table texts: ${description}`, () => {
      expect(data.element().getText()).toBe(data.actualResult);
    });
  });

  it('Large modal open and close by missclick', () => {
    buttonLargeModal.click();
    expect(modalTitleText).toBe('Large modal');
    expect(modalBodyText).toBe('...');

    browser.actions()
      .mouseMove({x: 1000, y: 0})
      .click()
      .perform();
    expect(modalIsPresent).toBeFalsy();
  });

  it('Small modal open and close by x-cross', () => {
    buttonSmallModal.click();
    expect(modalTitleText).toBe('Small modal');
    expect(modalBodyText).toBe('...');

    modalCloseButton.click();
    expect(modalIsPresent).toBeFalsy();
  });

  it('Open child modal click', () => {
    buttonChildModal.click();
    expect(modalTitleText).toBe('Child modal');
    expect(modalBodyText).toBe('I am a child modal, opened from parent component!');

    modalCloseButton.click();
    expect(modalIsPresent).toBeFalsy();
  });

  it('Static modal click', () => {
    buttonStaticModal.click();

    expect(modalTitleText).toBe('Static modal');
    expect(modalBodyText).toBe('This is static modal, backdrop click will not close it. Click × to close modal.');
  });

  it('Static modal does not close by misclick', async () => {
    const modalIsDisplayed = await modalWindow.isDisplayed();

    browser.actions()
      .mouseMove({x: 0, y: 0})
      .click()
      .perform();

    expect(modalIsDisplayed).toBeTruthy();
  });

  it('Static modal close by cross', () => {
    modalCloseButton.click();

    expect(modalIsPresent).toBeFalsy();
  });
});
