import { CarouselPo } from '../support/carousel.po';

describe('Carousel page test suite', () => {
  const carousel = new CarouselPo();

  beforeEach(() => carousel.navigateTo());

  describe('Basic', () => {
    const basic = carousel.exampleDemosArr.basic;

    it('example contains slides, indicators, left and right controls', () => {
      carousel.isCarouselHaveIndicatorsItemsCtrls(basic);
    });
  });
});
