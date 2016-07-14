/**
 * Created by vs on 7/12/16.
 * This test is checks left panel appearing/disappearing at differ windows sizes
 */
// 'use strict';
const menuLeftMaxi = $('.main-menu-container');
const menuLeftMini = $('#mobile-main-menu');
const obj = {
  checkLeftPanelMini: () => {
    browser.manage().window().setSize(800, 600);
    browser.sleep(1000);
    expect((menuLeftMini).isDisplayed()).toBeTruthy();
  },
  checkLeftPanelMaxi: () => {
    browser.manage().window().maximize();
    browser.sleep(1000);
    expect((menuLeftMaxi).isDisplayed()).toBeTruthy();
  }
};
module.exports = obj;
