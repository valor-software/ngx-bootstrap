import { CollapsePo } from '../support/collapse.po';

describe('Collapse demo page test suite', () => {
  const collapse = new CollapsePo();

  beforeEach(() => collapse.navigateTo());

  describe('Basic', () => {
    const basic = collapse.exampleDemosArr.basic;

    it('contains togler and content, that can be collapsed', () => {
      const toglerText = 'Toggle collapse';

      cy.get(`${ basic } ${ collapse.collapseClass }`)
        .should('to.have.class', collapse.showIndicator);

      collapse.clickByText(basic, toglerText);
      cy.get(`${ basic } ${ collapse.collapseClass }`)
        .should('not.to.have.class', collapse.showIndicator);
    });
  });
});
