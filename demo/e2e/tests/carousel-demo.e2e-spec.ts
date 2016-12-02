import { $, $$, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

let using = require('jasmine-data-provider');
const inputInterval = $('input.form-control');
const buttonAddSlide = $('.btn');
const controlLeft = $('.left');
const controlRight = $('.right');
const slidesCount = $$('.carousel-inner > *');
const checkboxDisableLopping = $('input[type="checkbox"]');

const getSlideNumber = (tabNumber:any) => {
  return '.carousel-inner>slide:nth-child(' + tabNumber + ')';
};
const doClick = (element:any, q:any) => {
  while (q > 0) {
    q--;
    element.click();
  }
};

describe('Carousel page tests on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/carousel');
    browser.ignoreSynchronization = true;
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
    inputInterval.clear();
  });
  it('Carousel default count', () => {
    expect(slidesCount.count()).toBe(4);
  });
  it('Carousel count after adding slides', () => {
    buttonAddSlide.click();
    buttonAddSlide.click();
    expect(slidesCount.count()).toBe(6);
  });
  it('Change the slides by Rigth/left controls ', () => {
    controlRight.click();
    expect($(getSlideNumber('2')).getAttribute('class')).toContain('active');
    controlLeft.click();
    expect($(getSlideNumber('1')).getAttribute('class')).toContain('active');
  });
  it('Disable slide looping. Right/Left sides', () => {
    checkboxDisableLopping.click();
    controlLeft.click();
    expect($(getSlideNumber('1')).getAttribute('class')).toContain('active');
    doClick(controlRight, 7);
    expect($(getSlideNumber('6')).getAttribute('class')).toContain('active');
    checkboxDisableLopping.click();
  });
  it('Slide lopping on Right/left sides', () => {
    doClick(controlRight, 1);
    expect($(getSlideNumber('1')).getAttribute('class')).toContain('active');
    controlLeft.click();
    expect($(getSlideNumber('6')).getAttribute('class')).toContain('active');
  });
  it('Change the slides by time', () => {
    browser.refresh();
    inputInterval.clear();
    inputInterval.sendKeys(`1500`);
    browser.sleep(2010);
    expect($(getSlideNumber('2')).getAttribute('class')).toContain('active');
    controlLeft.click();
  });
  using (DataProvider.carouselSlidesTexts, (data:any, description:string) => {
    it ('Check table texts: ' + description, () => {
      expect(data.element().getText()).toBe(data.actualResult);
      controlRight.click();
    });
  });
});
