/**
 * Created by vs on 7/12/16.
 * This test is checks left panel appearing/disappearing at differ windows sizes
 */

'use strict';
const menuLeftMaxi = $('.main-menu-container');
const menuLeftMini = $('#mobile-main-menu');
// const using = require ('jasmine-data-provider'); //not used for now

let leftPanelTests = function () {
  this.checkLeftPanelMini = () => {
    browser.manage().window().setSize(800, 600);
    browser.sleep(1000);
    expect((menuLeftMini).isDisplayed()).toBeTruthy();
  };
  this.checkLeftPanelMaxi = () => {
    browser.manage().window().maximize();
    browser.sleep(1000);
    expect((menuLeftMaxi).isDisplayed()).toBeTruthy();
  };
};
module.exports = leftPanelTests;
