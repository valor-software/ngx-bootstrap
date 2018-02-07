import { PopoverPo } from '../support/popover.po';

describe('Popover demo page test suite', () => {
  const popover = new PopoverPo();
  const popoverDemos = popover.exampleDemosArr;

  beforeEach(() => popover.navigateTo());

  it('popover page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to popover component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', popover.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', popover.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', popover.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('basic popover appears after clicking on trigger button', () => {
    const buttonText = 'Live demo';

    popover.clickByText(popoverDemos[0], buttonText);
    cy.get(popoverDemos[0]).should('to.have.descendants', 'popover-container');
  });
});
