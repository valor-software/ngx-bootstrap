import { CollapsePo } from '../support/collapse.po';

describe('Collapse demo page test suite', () => {
  const collapse = new CollapsePo();
  const collapseTitles = collapse.exampleTitlesArr;
  const collapseDemos = collapse.exampleDemosArr;

  beforeEach(() => collapse.navigateTo());

  it('collapse page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to collapse component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', collapse.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', collapse.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', collapse.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('Basic collapse example contains toggler and content, that could be collapsed', () => {
    const showIndicator = 'in show';
    const togglerText = 'Toggle collapse';

    cy.get(collapseDemos[0]).as('basic').children('.collapse')
      .should('to.have.class', showIndicator);

    collapse.clickByText('@basic', togglerText);
    cy.get('@basic').children('.collapse')
      .should('not.to.have.class', showIndicator);
  });
});
