import { SortablePo } from '../support/sortable.po';

describe('Sortable demo page test suite', () => {
  const sortable = new SortablePo();

  beforeEach(() => sortable.navigateTo());

  describe('Basic', () => {
    const basic = sortable.exampleDemosArr.basic;

    it('sortable items are placed at two sortable-wrappers', () => {
      cy.get(`${ basic } ${ sortable.classWrapper }`).as('wrapper').eq(0)
        .should('to.have.descendants', sortable.classItem);
      cy.get('@wrapper').eq(1)
        .should('to.have.descendants', sortable.classItem);
    });
  });
});
