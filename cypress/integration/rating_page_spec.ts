import { RatingPo } from '../support/rating.po';

describe('Rating demo page test suite', () => {
  const rating = new RatingPo();

  beforeEach(() => rating.navigateTo());

  describe('Basic rating', () => {
    const basic = rating.exampleDemosArr.basic;
    const confComponent = {
      maxVal: '10',
      currRate: '7',
      readonly: 'not.to.be.enabled'
    };
    const outputText = 'Rate: 7 ';

    it('basic rating example contains readonly rating with preconfigured values', () => {
      cy.get(`${ basic } ${rating.tagRating}`).as('rating')
        .should('to.be.visible')
        .and(confComponent.readonly);
      cy.get('@rating').find('span')
        .should('to.have.attr', 'aria-valuemax', confComponent.maxVal)
        .and('to.have.attr', 'aria-valuenow', confComponent.currRate);

      cy.get(`${ basic } ${ rating.outputClass }`)
        .should('to.have.text', outputText);
    });
  });
});
