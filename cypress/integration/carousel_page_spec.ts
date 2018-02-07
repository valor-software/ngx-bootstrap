import { CarouselPo } from '../support/carousel.po';

describe('Carousel page test suite', () => {
  const carousel = new CarouselPo();
  const carouselDemos = carousel.exampleDemosArr;

  beforeEach(() => carousel.navigateTo());

  it('carousel page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to carousel component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', carousel.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', carousel.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', carousel.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('basic demo example contains slides, indicators, left and right controlls', () => {
    cy.get(carouselDemos[0]).find('.carousel')
      .should('to.have.descendants', '.carousel-indicators')
      .and('to.have.descendants', '.carousel-inner')
      .and('to.have.descendants', '.carousel-control-prev')
      .and('to.have.descendants', '.carousel-control-next');
  });
});
