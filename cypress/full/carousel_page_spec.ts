import { CarouselPo } from '../support/carousel.po';

describe('Carousel page test suite', () => {
  const carousel = new CarouselPo();

  beforeEach(() => {
    cy.clock();
    carousel.navigateTo();
  });

  describe('Optional captions', () => {
    const optCaptions = carousel.exampleDemosArr.optionalCaptions;

    it('example contains slides, indicators, left and right controls and captions', () => {
      carousel.scrollToMenu('Optional captions');
      carousel.isCarouselHaveIndicatorsItemsCtrls(optCaptions);
      carousel.isEachSlideHave(optCaptions, ['.item', '.carousel-caption', 'h3']);
    });

    it('when user click on indicator item - appropriate slide shown', () => {
      carousel.isClickActivatedCarouselItem(optCaptions, 1);
      carousel.isClickActivatedCarouselItem(optCaptions, 0);
      carousel.isClickActivatedCarouselItem(optCaptions, 2);
    });

    it('when user click on left/right arrow - previous/next slide shown', () => {
      carousel.scrollToMenu('Optional captions');
      carousel.clickOnCtrl(optCaptions, 'left');
      carousel.isCarouselItemActive(optCaptions, 2);
      carousel.clickOnCtrl(optCaptions, 'right');
      carousel.isCarouselItemActive(optCaptions, 0);
    });

    it('when user do nothing more than 5 sec - next slide automatically shown', () => {
      carousel.scrollToMenu('Optional captions');
      carousel.isCarouselItemActive(optCaptions, 0);
      cy.tick(6000);
      carousel.isCarouselItemActive(optCaptions, 1);
    });
  });

  describe('Configuring defaults', () => {
    const confDefaults = carousel.exampleDemosArr.configuringDefaults;

    it('example contains slides, indicators, left and right controls and captions', () => {
      carousel.scrollToMenu('Configuring defaults');
      carousel.isCarouselHaveIndicatorsItemsCtrls(confDefaults);
      carousel.isEachSlideHave(confDefaults, ['.item', '.carousel-caption', 'h3']);
    });

    it('when user click on indicator item - appropriate slide shown', () => {
      carousel.isClickActivatedCarouselItem(confDefaults, 1);
      carousel.isClickActivatedCarouselItem(confDefaults, 0);
      carousel.isClickActivatedCarouselItem(confDefaults, 2);
    });

    it('when user do nothing more than 1.5 sec - next slide automatically shown', () => {
      carousel.scrollToMenu('Optional captions');
      carousel.isCarouselItemActive(confDefaults, 0);
      cy.tick(2000);
      carousel.isCarouselItemActive(confDefaults, 1);
    });
  });

  describe('Dynamic Slides ', () => {
    const dynamicSlides = carousel.exampleDemosArr.dynamicSlides;

    it('example contains slides, indicators, left and right controls and captions', () => {
      carousel.scrollToMenu('Dynamic Slides');
      carousel.isCarouselHaveIndicatorsItemsCtrls(dynamicSlides);
      carousel.isEachSlideHave(dynamicSlides, ['.item', '.carousel-caption', 'h4']);
    });

    it('example contains 3 additional buttons: "Add Slide", "Remove Current", "Remove #3"', () => {
      carousel.scrollToMenu('Dynamic Slides');
      carousel.isBtnTxtEqual(dynamicSlides, 'Add Slide ', 0);
      carousel.isBtnTxtEqual(dynamicSlides, 'Remove Current ', 1);
      carousel.isBtnTxtEqual(dynamicSlides, 'Remove #3 ', 2);
    });

    it('when user click on "Add Slide", then amount of slides increased at 1 with header and info', () => {
      carousel.scrollToMenu('Dynamic Slides');
      carousel.isSlidesCountEqual(dynamicSlides, 4);
      carousel.clickOnBtn(dynamicSlides, 0);
      carousel.isSlidesCountEqual(dynamicSlides, 5);
      carousel.clickOnBtn(dynamicSlides, 0);
      carousel.isSlidesCountEqual(dynamicSlides, 6);
    });

    it('when user click on "Remove Current", then amount of slides decreased at 1 and current slide deleted', () => {
      carousel.scrollToMenu('Dynamic Slides');
      carousel.isSlidesCountEqual(dynamicSlides, 4);
      carousel.clickOnBtn(dynamicSlides, 1);
      carousel.isSlidesCountEqual(dynamicSlides, 3);
      carousel.clickOnBtn(dynamicSlides, 1);
      carousel.isSlidesCountEqual(dynamicSlides, 2);
    });

    it('when user click on "Remove #3" - then third slide deleted', () => {
      carousel.scrollToMenu('Dynamic Slides');
      carousel.isSlidesCountEqual(dynamicSlides, 4);
      carousel.clickOnBtn(dynamicSlides, 2);
      carousel.isSlidesCountEqual(dynamicSlides, 3);
      carousel.clickOnBtn(dynamicSlides, 2);
      carousel.isSlidesCountEqual(dynamicSlides, 2);
      carousel.clickOnBtn(dynamicSlides, 2);
      carousel.isSlidesCountEqual(dynamicSlides, 2);
    });

    it('when user do nothing more than 5 sec - next slide automatically shown', () => {
      carousel.scrollToMenu('Optional captions');
      carousel.isCarouselItemActive(dynamicSlides, 0);
      cy.tick(6000);
      carousel.isCarouselItemActive(dynamicSlides, 1);
    });
  });

  describe('Pause on hover ', () => {
    const pauseOnHoverSlides = carousel.exampleDemosArr.pauseOnHover;

    it('example contains carousel component with slides, arrows and "Toggle pause on hover" button', () => {
      carousel.scrollToMenu('Pause on hover');
      carousel.isCarouselHaveIndicatorsItemsCtrls(pauseOnHoverSlides);
      carousel.isEachSlideHave(pauseOnHoverSlides, ['.item', '.carousel-caption', 'h3']);
      carousel.isBtnTxtEqual(pauseOnHoverSlides, 'Toggle pause on hover ');
    });

    it('when user click on "Toggle pause on hover" and hover slide - then after 5 sec slide stay opened', () => {
      carousel.scrollToMenu('Pause on hover');
      carousel.clickOnBtn(pauseOnHoverSlides);
      carousel.hoverSlide(pauseOnHoverSlides, 1);
      carousel.isCarouselItemActive(pauseOnHoverSlides, 0);
      cy.tick(6000);
      carousel.isCarouselItemActive(pauseOnHoverSlides, 0);
    });

    it('when user click on "Toggle pause on hover" again, hover slide - then after 5 sec slide changed', () => {
      carousel.scrollToMenu('Pause on hover');
      carousel.dblClickOnBtn(pauseOnHoverSlides);
      carousel.hoverSlide(pauseOnHoverSlides, 1);
      carousel.isCarouselItemActive(pauseOnHoverSlides, 0);
      cy.tick(6000);
      carousel.isCarouselItemActive(pauseOnHoverSlides, 1);
    });
  });

  describe('Custom content ', () => {
    const customContentSlides = carousel.exampleDemosArr.customContent;

    it('example contains slides, indicators, left and right controls and custom content', () => {
      carousel.scrollToMenu('Custom content');
      carousel.isCarouselHaveIndicatorsItemsCtrls(customContentSlides);
      carousel.isEachSlideHave(customContentSlides, ['.item', 'h3', 'p', '.lead', 'h2']);
    });
  });

  describe('Disable slide looping ', () => {
    const disableLoopingSlides = carousel.exampleDemosArr.disableLooping;

    it('example contains slides, indicators, left and right controls and "Disable Slide Looping" checkbox', () => {
      carousel.scrollToMenu('Disable slide looping');
      carousel.isCarouselHaveIndicatorsItemsCtrls(disableLoopingSlides);
      carousel.isLabelTxtEqual(disableLoopingSlides, 'Disable Slide Looping');
    });

    it('when user click on checkbox "Disable Slide Looping", then no one slide should be shown after latest', () => {
      carousel.scrollToMenu('Disable slide looping');
      carousel.isClickActivatedCarouselItem(disableLoopingSlides, 2);
      carousel.clickOnInput(disableLoopingSlides);
      cy.tick(6000);
      carousel.isCarouselItemActive(disableLoopingSlides, 2);
    });

    it('when user uncheck "Disable slide looping", then slides continue changing after 5 sec', () => {
      carousel.scrollToMenu('Disable slide looping');
      carousel.isClickActivatedCarouselItem(disableLoopingSlides, 2);
      carousel.dblClickOnInput(disableLoopingSlides);
      cy.tick(6000);
      carousel.isCarouselItemActive(disableLoopingSlides, 0);
    });
  });

  describe('Disable indicator ', () => {
    const disableIndicatorSlides = carousel.exampleDemosArr.disableIndicator;

    it('example contains slides, indicators, left and right controls and "Enable/Disable" button', () => {
      carousel.scrollToMenu('Disable indicator');
      carousel.isCarouselHaveIndicatorsItemsCtrls(disableIndicatorSlides);
      carousel.isBtnTxtEqual(disableIndicatorSlides, 'Enable/Disable Indicator ');
    });
    it('when user click on "Enable/Disable Indicator" - indicator disappeared', () => {
      carousel.scrollToMenu('Disable indicator');
      carousel.clickOnBtn(disableIndicatorSlides);
      carousel.isCarouselIndicatorDisabled(disableIndicatorSlides, true);
    });
    it('when user click on "Enable/Disable Indicator" again - indicator appeared', () => {
      carousel.scrollToMenu('Disable indicator');
      carousel.dblClickOnBtn(disableIndicatorSlides);
      carousel.isCarouselIndicatorDisabled(disableIndicatorSlides, false);
    });
  });

  describe('Interval ', () => {
    const intervalSlides = carousel.exampleDemosArr.interval;

    it('example contains slides, indicators, left and right controls and input with default interval: 1500', () => {
      carousel.scrollToMenu('Interval');
      carousel.isCarouselHaveIndicatorsItemsCtrls(intervalSlides);
      carousel.isInputHaveAttrs(intervalSlides,
        [{ attr: 'type', value: 'number' }]);
    });

    it('when user change the interval in input to any positive value - then slides change after added interval', () => {
      carousel.scrollToMenu('Interval');
      const newInterval = '3000';
      carousel.clearInputAndSendKeys(intervalSlides, newInterval);
      carousel.isInputHaveAttrs(intervalSlides, [{ attr: 'type', value: 'number' }]);
      carousel.isCarouselItemActive(intervalSlides, 0);
      cy.tick(4000);
      carousel.isCarouselItemActive(intervalSlides, 1);
    });

    it('When user change the interval in input to "0" - then slider stopped', () => {
      carousel.scrollToMenu('Interval');
      const newInterval = '0';
      carousel.clearInputAndSendKeys(intervalSlides, newInterval);
      carousel.isInputHaveAttrs(intervalSlides, [{ attr: 'type', value: 'number' }]);
      carousel.isCarouselItemActive(intervalSlides, 0);
      cy.tick(3000);
      carousel.isCarouselItemActive(intervalSlides, 0);
    });

    it('When user change the interval in input to any negative value - then carousel stopped', () => {
      carousel.scrollToMenu('Interval');
      const newInterval = '-100';
      carousel.clearInputAndSendKeys(intervalSlides, newInterval);
      carousel.isInputHaveAttrs(intervalSlides, [{ attr: 'type', value: 'number' }]);
      carousel.isCarouselItemActive(intervalSlides, 0);
      cy.tick(3000);
      carousel.isCarouselItemActive(intervalSlides, 0);
    });
  });

  describe('Slide changed event ', () => {
    const changedEventSlides = carousel.exampleDemosArr.slideChangedEvent;

    it('example contains slides, indicators, left and right controls and "Slide has been switched: 0"', () => {
      carousel.scrollToMenu('Slide changed event');
      carousel.isCarouselHaveIndicatorsItemsCtrls(changedEventSlides);
      carousel.isCardTxtEqual(changedEventSlides, 'Slide has been switched: 0');
    });

    it('when user click on left arrow - info changed to "Slide has been switched: 2"', () => {
      carousel.scrollToMenu('Slide changed event');
      carousel.clickOnCtrl(changedEventSlides, 'left');
      carousel.isCardTxtEqual(changedEventSlides, 'Slide has been switched: 2');
    });

    it('when user click on left arrow again - info changed to "Slide has been switched: 1"', () => {
      carousel.scrollToMenu('Slide changed event');
      carousel.clickOnCtrl(changedEventSlides, 'left');
      carousel.clickOnCtrl(changedEventSlides, 'left');
      carousel.isCardTxtEqual(changedEventSlides, 'Slide has been switched: 1');
    });

    it('when user click on right arrow - info changed to "Slide has been switched: 1"', () => {
      carousel.scrollToMenu('Slide changed event');
      carousel.clickOnCtrl(changedEventSlides, 'right');
      carousel.isCardTxtEqual(changedEventSlides, 'Slide has been switched: 1');
    });

    it('when user click on right arrow again - info changed to "Slide has been switched: 2"', () => {
      carousel.scrollToMenu('Slide changed event');
      carousel.clickOnCtrl(changedEventSlides, 'right');
      carousel.clickOnCtrl(changedEventSlides, 'right');
      carousel.isCardTxtEqual(changedEventSlides, 'Slide has been switched: 2');
    });
  });

  describe('Accessibility ', () => {
    const accessibilityInfo = carousel.exampleDemosArr.accessibility;

    it('example contains info about "alt" attribute', () => {
      cy.viewport(1440, 900);
      carousel.clickOnDemoMenu('Accessibility');
      carousel.isDemoContainsTxt(accessibilityInfo, 'alt');
    });
  });
});
