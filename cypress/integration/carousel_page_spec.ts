import { CarouselPo } from '../support/carousel.po';

describe('Carousel page test suite', () => {
  const carousel = new CarouselPo();

  beforeEach(() => carousel.navigateTo());

  describe('Basic', () => {
    const basic = carousel.exampleDemosArr.basic;

    it('example contains slides, indicators, left and right controls', () => {
      cy.get(`${ basic } ${ carousel.carouselClass }`)
        .should('to.have.descendants', carousel.indicatorClass)
        .and('to.have.descendants', carousel.itemClass)
        .and('to.have.descendants', carousel.leftControl)
        .and('to.have.descendants', carousel.rightControl);
    });
  });
});
