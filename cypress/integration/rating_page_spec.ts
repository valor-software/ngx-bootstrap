import { RatingPo } from '../support/rating.po';

describe('Rating demo page test suite', () => {
  const rating = new RatingPo();
  const ratingDemos = rating.exampleDemosArr;

  beforeEach(() => rating.navigateTo());

  it('rating page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to rating component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', rating.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', rating.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', rating.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('basic rating example contains readonly rating with preconfigured values', () => {
    cy.get(ratingDemos[0]).children('rating').as('rating')
      .should('to.be.visible')
      .and('not.to.be.enabled');
    cy.get('@rating').children('span')
      .should('to.have.attr', 'aria-valuemax', '10')
      .and('to.have.attr', 'aria-valuenow', '7');

    cy.get(ratingDemos[0]).find('.card-block')
      .should('to.have.text', 'Rate: 7 ');
  });
});
