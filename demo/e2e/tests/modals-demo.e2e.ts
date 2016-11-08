import { $, browser } from 'protractor/globals';

const leftPanelTests = require('./../data/leftPanelTests.e2e');
const buttonLargeModal = $('.btn:nth-child(1)');
const buttonSmallModal = $('.btn:nth-child(3)');
const buttonChildModal = $('.btn:nth-child(5)');
const buttonStaticModal = $('.btn:nth-child(7)');
const modalWindow = $('.modal.fade.in');
const modalTitle = $('.modal.fade.in .modal-title');
const modalBody = $('.modal.fade.in .modal-body');
const modalCloseButton = $('.modal.fade.in .close');

describe('Modals page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/modals');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Check text in buttons', () => {
    expect(buttonLargeModal.getText()).toBe('Large modal');
    expect(buttonSmallModal.getText()).toBe('Small modal');
    expect(buttonChildModal.getText()).toBe('Open child modal');
    expect(buttonStaticModal.getText()).toBe('Static modal');
  });
  it('Large modal click', () => {
    buttonLargeModal.click();
    expect(modalTitle.getText()).toBe('Large modal');
    expect(modalBody.getText()).toBe('...');
  });
  it('Large modal closed by missclick', () => {
    buttonLargeModal.click();
    browser.actions().
    mouseDown(buttonLargeModal).
    click().
    perform();
    expect(modalWindow.isPresent()).toBe(false);
  });
  it('Small modal click', () => {
    buttonSmallModal.click();
    expect(modalTitle.getText()).toBe('Small modal');
    expect(modalBody.getText()).toBe('...');
  });
  it('Open child modal click', () => {
    buttonChildModal.click();
    expect(modalTitle.getText()).toBe('Child modal');
    expect(modalBody.getText()).toBe('I am a child modal, opened from parent component!');
  });
  it('Static modal click', () => {
    buttonStaticModal.click();
    expect(modalTitle.getText()).toBe('Static modal');
    expect(modalBody.getText()).toBe('This is static modal, backdrop click will not close it. Click × to close modal.');
  });
  it('Static modal close by cross', () => {
    buttonStaticModal.click();
    modalCloseButton.click();
    expect(modalWindow.isPresent()).toBe(false);
  });
  it('Static modal does not close by misclick', () => {
    buttonStaticModal.click();
    browser.actions().
    mouseDown(buttonLargeModal).
    click().
    perform();
    expect(modalWindow.isDisplayed()).toBe(true);
  });
});

describe('Modals page test on bootstrap 4', () => {
  beforeAll(() => {
    browser.get('index-bs4.html#/modals');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Check text in buttons', () => {
    expect(buttonLargeModal.getText()).toBe('Large modal');
    expect(buttonSmallModal.getText()).toBe('Small modal');
    expect(buttonChildModal.getText()).toBe('Open child modal');
    expect(buttonStaticModal.getText()).toBe('Static modal');
  });
  it('Large modal click', () => {
    buttonLargeModal.click();
    expect(modalTitle.getText()).toBe('Large modal');
    expect(modalBody.getText()).toBe('...');
  });
  it('Large modal closed by missclick', () => {
    buttonLargeModal.click();
    browser.actions().
    mouseDown(buttonLargeModal).
    click().
    perform();
    expect(modalWindow.isPresent()).toBe(false);
  });
  it('Small modal click', () => {
    buttonSmallModal.click();
    expect(modalTitle.getText()).toBe('Small modal');
    expect(modalBody.getText()).toBe('...');
  });
  it('Open child modal click', () => {
    buttonChildModal.click();
    expect(modalTitle.getText()).toBe('Child modal');
    expect(modalBody.getText()).toBe('I am a child modal, opened from parent component!');
  });
  it('Static modal click', () => {
    buttonStaticModal.click();
    expect(modalTitle.getText()).toBe('Static modal');
    expect(modalBody.getText()).toBe('This is static modal, backdrop click will not close it. Click × to close modal.');
  });
  it('Static modal close by cross', () => {
    buttonStaticModal.click();
    modalCloseButton.click();
    expect(modalWindow.isPresent()).toBe(false);
  });
  it('Static modal does not close by misclick', () => {
    buttonStaticModal.click();
    browser.actions().
    mouseDown(buttonLargeModal).
    click().
    perform();
    expect(modalWindow.isDisplayed()).toBe(true);
  });
});
