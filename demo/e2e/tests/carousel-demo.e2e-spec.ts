import { $, $$, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';

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
    browser.get(`${browser.baseUrl}#/carousel`);
    browser.ignoreSynchronization = true;
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Carousel default count', () => {
    expect(slidesCount.count()).toBe(4);
  });
  it('Carousel count after adding slides', () => {
    buttonAddSlide.click();
    buttonAddSlide.click();
    expect(slidesCount.count()).toBe(6);
  });
  it('Change the slides by clicking in right', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    controlRight.click();
    expect($(getSlideNumber('2')).getAttribute('class')).toContain('active');
  });
  it('Change the slides by clicking in left', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    controlLeft.click();
    expect($(getSlideNumber('4')).getAttribute('class')).toContain('active');
  });
  it('Change the slides by time', () => {
    browser.sleep(5000);
    expect($(getSlideNumber('2')).getAttribute('class')).toContain('active');
  });
  it('Disable slide looping. Left control', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    checkboxDisableLopping.click();
    controlLeft.click();
    expect($(getSlideNumber('1')).getAttribute('class')).toContain('active');
  });
  it('Disable slide looping. Right control', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    checkboxDisableLopping.click();
    doClick(controlRight, 5);
    browser.sleep(6000);
    expect($(getSlideNumber('4')).getAttribute('class')).toContain('active');
  });
  it('Slide lopping on right', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    doClick(controlRight, 4);
    expect($(getSlideNumber('1')).getAttribute('class')).toContain('active');
  });
  it('Slide lopping on left', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    controlLeft.click();
    expect($(getSlideNumber('4')).getAttribute('class')).toContain('active');
  });
});
describe('Carousel page tests on bootstrap 4', () => {
  beforeAll(() => {
    browser.get('index-bs4.html#/carousel');
    browser.ignoreSynchronization = true;
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  beforeEach(() => {
    browser.refresh();
  });
  it('Carousel default count', () => {
    expect(slidesCount.count()).toBe(4);
  });
  it('Carousel count after adding slides', () => {
    buttonAddSlide.click();
    buttonAddSlide.click();
    expect(slidesCount.count()).toBe(6);
  });
  it('Change the slides by clicking in right', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    controlRight.click();
    expect($(getSlideNumber('2')).getAttribute('class')).toContain('active');
  });
  it('Change the slides by clicking in left', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    controlLeft.click();
    expect($(getSlideNumber('4')).getAttribute('class')).toContain('active');
  });
  it('Change the slides by time', () => {
    browser.sleep(6000);
    expect($(getSlideNumber('2')).getAttribute('class')).toContain('active');
  });
  it('Disable slide looping. Left control', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    checkboxDisableLopping.click();
    controlLeft.click();
    expect($(getSlideNumber('1')).getAttribute('class')).toContain('active');
  });
  it('Disable slide looping. Right control', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    checkboxDisableLopping.click();
    doClick(controlRight, 5);
    expect($(getSlideNumber('4')).getAttribute('class')).toContain('active');
  });
  it('Slide lopping on right', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    doClick(controlRight, 4);
    expect($(getSlideNumber('1')).getAttribute('class')).toContain('active');
  });
  it('Slide lopping on left', () => {
    inputInterval.clear();
    inputInterval.sendKeys('0');
    controlLeft.click();
    expect($(getSlideNumber('4')).getAttribute('class')).toContain('active');
  });
});
