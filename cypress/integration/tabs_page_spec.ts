import { TabsPo } from '../support/tabs.po';

describe('Tabs demo page spec', () => {
  const tabs = new TabsPo();
  const tabDemos = tabs.exampleDemosArr;

  beforeEach(() => tabs.navigateTo());

  it('tabs page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to tabs component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', tabs.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', tabs.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', tabs.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('configuring defaults example contains preconfigured tabs', () => {
    cy.get(tabDemos[7]).find('.nav-pills').children('.nav-item').as('pills').eq(0)
      .should('to.have.class', 'active');
    cy.get('@pills').eq(1)
      .should('not.to.have.class', 'active');

    cy.get('@pills').eq(1).click();
    cy.get(tabDemos[7]).find('.nav-pills').children('.nav-item').as('pills').eq(0)
      .should('not.to.have.class', 'active');
    cy.get('@pills').eq(1)
      .should('to.have.class', 'active');
  });
});
