import { RatingPo } from '../support/rating.po';

describe('Rating demo page testing suite', () => {
  const rating = new RatingPo();

  beforeEach(() => rating.navigateTo());

  describe('Basic rating', () => {
    const basic = rating.exampleDemosArr.basic;

    it(`example contains rating with 10 stars and card with "Rate: N" text,
      first N stars - selected, others - not selected`, () => {
      rating.scrollToMenu('Basic rating');
      rating.isRatingVisible(basic);
      rating.isRatingReadonly(basic, true);
      rating.isRatingMaxEqual(basic, 10);
      rating.isRatingCurrentEqual(basic, 7);
      rating.isPreviewExist(basic, 'Rate: 7');
    });
  });
});
