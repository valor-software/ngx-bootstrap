import { PaginationPo } from '../support/pagination.po';

describe('Pagination demo page test suite', () => {
  const pagination = new PaginationPo();

  beforeEach(() => pagination.navigateTo());

  describe('Pager', () => {
    const pager = pagination.exampleDemosArr.pager;

    it('active page can be changed by clicking on Next or Previous button', () => {
      cy.get(`${ pager } ${ pagination.classActive }`)
        .should('to.contain', '4');

      pagination.clickByText(pager, pagination.btnPrev);
      cy.get(`${ pager } ${ pagination.classActive }`)
        .should('to.contain', '3');

      pagination.clickByText(pager, pagination.btnNext);
      cy.get(`${ pager } ${ pagination.classActive }`)
        .should('to.contain', '4');
    });
  });
});
