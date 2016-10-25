import { $, browser } from 'protractor';

const menuLeftMaxi = $('.main-menu-container');
const menuLeftMini = $('#mobile-main-menu');

const leftPanelTests = {
  checkLeftPanelMini: () => {
    browser.driver.manage().window().setSize(800, 600);
    browser.sleep(500);
    expect(menuLeftMini.isDisplayed()).toBeTruthy();
  },
  checkLeftPanelMaxi: () => {
    browser.driver.manage().window().maximize();
    browser.sleep(500);
    expect(menuLeftMaxi.isDisplayed()).toBeTruthy();
  }
};
export { leftPanelTests };
