import { CarouselPo } from '../support/carousel.po';

describe('Carousel page test suite', () => {
  const carousel = new CarouselPo();

  beforeEach(() => {
    cy.clock();
    carousel.navigateTo();
  });

  describe('Basic', () => {
    const basic = carousel.exampleDemosArr.basic;

    it('example contains slides, indicators, left and right controls', () => {
      carousel.isCarouselHaveIndicatorsItemsCtrls(basic);
    });

    it('when user click on indicator item - appropriate slide shown', () => {
      carousel.isClickActivatedCarouselItem(basic, 1);
      carousel.isClickActivatedCarouselItem(basic, 0);
      carousel.isClickActivatedCarouselItem(basic, 2);
    });

    it('when user click on left/right arrow - previous/next slide shown', () => {
      carousel.clickOnCtrl(basic, 'left');
      carousel.isCarouselItemActive(basic, 2);
      carousel.clickOnCtrl(basic, 'right');
      carousel.isCarouselItemActive(basic, 0);
    });

    it('when user do nothing more than 5 sec - next slide automatically shown', () => {
      carousel.scrollToMenu('Basic');
      carousel.isCarouselItemActive(basic, 0);
      cy.tick(6000);
      carousel.isCarouselItemActive(basic, 1);
    });
  });
});
