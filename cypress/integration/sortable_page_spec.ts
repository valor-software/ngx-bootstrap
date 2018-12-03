import { SortablePo } from '../support/sortable.po';

describe('Sortable demo page test suite', () => {
  const sortable = new SortablePo();
  beforeEach(() => sortable.navigateTo());

  describe('Basic', () => {
    const basic = sortable.exampleDemosArr.basic;

    it('sortable items are placed at two sortable-wrappers', () => {
      cy.get(`${ basic } ${ sortable.classWrapper } `).as('wrapper').eq(0)
        .should('to.have.descendants', sortable.classItem);
      cy.get('@wrapper').eq(1)
        .should('to.have.descendants', sortable.classItem);
    });
  });
  describe('Complex data model', () => {
    const complex = sortable.exampleDemosArr.complex;

    it('sortable items are placed at two sortable-wrappers', () => {
      cy.get(`${ complex } ${sortable.classWrapper}`).as('wrapper').eq(0)
        .should('to.have.descendants', sortable.classItem);
      cy.get('@wrapper').eq(1)
        .should('to.have.descendants', sortable.classItem);
    });

    it('Move to the top', function () {
      cy.get(`${ complex } ${sortable.classWrapper}`).as('wrapper').eq(0).contains('Windstorm')
        .trigger('mousedown', {which: 1, pageX: 600, pageY: 100})
        .trigger('mousemove', {which: 0, pageX: 700, pageY: 600})
        .trigger('mouseup');
      cy.wait(1000);
    });
  });
});
