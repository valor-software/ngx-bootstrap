import { PaginationPo } from '../support/pagination.po';

describe('Pagination demo page test suite', () => {
  const pagination = new PaginationPo();
  const paginationDemos = pagination.exampleDemosArr;

  beforeEach(() => pagination.navigateTo());

  it('pagination page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('pagination header contains title and link to carousel component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', pagination.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', pagination.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', pagination.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('active pager page can be changed by clicking toggler buttons', () => {
    const prevBtn = 'Previous';
    const nextBtn = 'Next';

    pagination.clickByText(paginationDemos[2], prevBtn);
    cy.get(paginationDemos[2]).find('.pagination').children('.active')
      .should('to.contain', '3');

    pagination.clickByText(paginationDemos[2], nextBtn);
    cy.get(paginationDemos[2]).find('.pagination').children('.active')
      .should('to.contain', '4');
  });
});
