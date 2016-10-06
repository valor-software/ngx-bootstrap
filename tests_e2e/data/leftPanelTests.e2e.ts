import { $, browser } from 'protractor/globals';

const menuLeftMaxi = $('.main-menu-container');
const menuLeftMini = $('#mobile-main-menu');

const leftPanelTests = {
  checkLeftPanelMini: () => {
    browser.driver.manage().window().setSize(800, 600);
    browser.sleep(1000);
    expect((menuLeftMini).isDisplayed()).toBeTruthy();
  },
  checkLeftPanelMaxi: () => {
    browser.driver.manage().window().maximize();
    browser.sleep(1000);
    expect((menuLeftMaxi).isDisplayed()).toBeTruthy();
  }
};
module.exports = leftPanelTests;
