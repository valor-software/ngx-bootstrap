import { ProgressbarPo } from '../support/progressbar.po';

describe('Progressbar demo page test suite', () => {
  const progressbar = new ProgressbarPo();
  const progressbarDemos = progressbar.exampleDemosArr;

  beforeEach(() => progressbar.navigateTo());

  it('progressbar page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to progressbar component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', progressbar.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', progressbar.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', progressbar.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('preconfigured progressbar contains styles and value from config', () => {
    cy.get(progressbarDemos[3]).children('progressbar').as('progressbarConf')
      .should('to.have.attr', 'type', 'danger')
      .and('to.have.attr', 'max', '150');

    cy.get('@progressbarConf').children('bar')
      .should('to.have.class', 'progress-bar-animated')
      .and('to.have.class', 'progress-bar-striped')
      .and('to.have.class', 'progress-bar-danger')
      .and('to.have.attr', 'aria-valuenow', '136');
  });
});
